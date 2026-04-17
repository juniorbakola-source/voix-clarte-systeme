import { useEffect, useRef, useState } from "react";

const API = "http://localhost:8787";
const PROXY = "http://localhost:8790";
const API_KEY = "super-secret-key";

type Role = "admin" | "operator" | "viewer";

type UserProfile = {
  username: string;
  role: Role;
  zones: string[];
};

type Camera = {
  id: string;
  name: string;
  protocol: string;
  url: string;
  zone: string;
  createdAt?: string;
};

type Source = {
  id: string;
  type: string;
  label: string;
  zone: string;
  status: string;
};

const fallbackProfiles: Record<string, UserProfile> = {
  admin: { username: "admin", role: "admin", zones: ["*"] },
  "ops-port": { username: "ops-port", role: "operator", zones: ["Port / Quai nord", "Parking Est"] },
  viewer: { username: "viewer", role: "viewer", zones: ["Parking Est"] },
};

const views = ["dashboard", "cameras", "auth", "connectors", "settings", "registry", "palantir"] as const;

type View = typeof views[number];

export default function Index() {
  const [view, setView] = useState<View>("dashboard");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("change-me");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<UserProfile>(fallbackProfiles.admin);
  const [context, setContext] = useState<any>({ mission: "Port surveillance", confidence: 98.2, latencySeconds: 12 });
  const [sources, setSources] = useState<Source[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [connectors, setConnectors] = useState<any>({});
  const [settings, setSettings] = useState({ palantirBaseUrl: "", palantirWorkspace: "", satelliteProvider: "", flightProvider: "", securityMode: "strict" });
  const [testResults, setTestResults] = useState<any>({});
  const [activeCamera, setActiveCamera] = useState<Camera | null>(null);
  const [cameraForm, setCameraForm] = useState({ name: "", protocol: "hls", url: "", zone: "" });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
    "X-User": profile.username,
    "X-Session-Token": token,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("opsvision-react-user");
    const storedToken = localStorage.getItem("opsvision-react-token");
    if (storedUser && fallbackProfiles[storedUser]) {
      setUsername(storedUser);
      setProfile(fallbackProfiles[storedUser]);
    }
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    void refreshData();
  }, [token, profile.username]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeCamera || activeCamera.protocol !== "hls") return;
    video.src = `${PROXY}/?url=${encodeURIComponent(activeCamera.url)}`;
  }, [activeCamera]);

  async function fetchJson(path: string) {
    const res = await fetch(`${API}${path}`, { headers });
    return res.json();
  }

  async function refreshData() {
    const [me, ctx, src, cams, conn] = await Promise.all([
      fetchJson("/api/auth/me"),
      fetchJson("/api/context"),
      fetchJson("/api/sources"),
      fetchJson("/api/cameras"),
      fetchJson("/api/connectors"),
    ]);
    if (me?.user) setProfile(me.user);
    if (!ctx?.error) setContext(ctx);
    if (src?.items) setSources(src.items);
    if (cams?.cameras) {
      setCameras(cams.cameras);
      if (cams.cameras[0]) setActiveCamera(cams.cameras[0]);
    }
    if (!conn?.error) {
      setConnectors(conn);
      const cfg = conn.config || {};
      setSettings({
        palantirBaseUrl: cfg.palantir?.baseUrl || "",
        palantirWorkspace: cfg.palantir?.workspace || "",
        satelliteProvider: cfg.satellite?.provider || "",
        flightProvider: cfg.flights?.provider || "",
        securityMode: cfg.security?.mode || "strict",
      });
    }
  }

  async function login() {
    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": API_KEY },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.error) return alert(data.message || data.error);
    setToken(data.token);
    setProfile(data.user);
    localStorage.setItem("opsvision-react-user", data.user.username);
    localStorage.setItem("opsvision-react-token", data.token);
  }

  function logout() {
    setToken("");
    setProfile(fallbackProfiles.viewer);
    localStorage.removeItem("opsvision-react-user");
    localStorage.removeItem("opsvision-react-token");
  }

  async function addCamera() {
    const res = await fetch(`${API}/api/cameras`, { method: "POST", headers, body: JSON.stringify(cameraForm) });
    const data = await res.json();
    if (data.error) return alert(data.message || data.error);
    setCameraForm({ name: "", protocol: "hls", url: "", zone: "" });
    await refreshData();
  }

  async function saveSettings() {
    const res = await fetch(`${API}/api/connectors`, { method: "POST", headers, body: JSON.stringify(settings) });
    const data = await res.json();
    setTestResults((prev) => ({ ...prev, save: data }));
    await refreshData();
  }

  async function testConnector(kind: "palantir" | "satellite" | "flights") {
    const data = await fetchJson(`/api/${kind}/test`);
    setTestResults((prev) => ({ ...prev, [kind]: data }));
  }

  const canAdmin = profile.role === "admin";
  const canConnectors = profile.role === "admin" || profile.role === "operator";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">OpsVision</h1>
          <p className="text-sm text-slate-400">voix-clarte-systeme → overwritten with OpsVision</p>
        </div>
        <div className="grid gap-2">
          {views.map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`rounded-xl px-4 py-3 text-left border ${view === item ? "bg-blue-600 border-blue-500" : "bg-slate-800 border-slate-700"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 grid gap-2">
          <h2 className="font-semibold">Session</h2>
          <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
          <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button className="rounded-lg bg-blue-600 px-3 py-2" onClick={login}>Login</button>
          <button className="rounded-lg bg-slate-700 px-3 py-2" onClick={logout}>Logout</button>
          <div className="text-xs text-slate-400">user: {profile.username} | role: {profile.role}</div>
        </div>
      </aside>

      <main className="flex-1 p-4 grid grid-rows-[72px_1fr] gap-4">
        <header className="rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-center justify-between">
          <div className="text-slate-300">Mission: {context.mission || "Port surveillance"}</div>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-slate-800 px-3 py-1">user: {profile.username}</span>
            <span className="rounded-full bg-slate-800 px-3 py-1">role: {profile.role}</span>
            <span className="rounded-full bg-slate-800 px-3 py-1">token: {token ? "actif" : "absent"}</span>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 overflow-auto">
          {view === "dashboard" && (
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-800 p-4">Confiance: {context.confidence}%</div>
                <div className="rounded-2xl bg-slate-800 p-4">Latence: {context.latencySeconds}s</div>
                <div className="rounded-2xl bg-slate-800 p-4">Sources: {sources.length}</div>
              </div>
              <div className="rounded-2xl bg-slate-800 p-6 min-h-[260px]">Carte / timeline / corrélation multi-sources</div>
            </div>
          )}

          {view === "cameras" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-800 p-4 grid gap-3">
                <h2 className="text-lg font-semibold">Caméras</h2>
                {cameras.map((cam) => (
                  <button key={cam.id} onClick={() => setActiveCamera(cam)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-left">
                    {cam.name} , {cam.zone}
                  </button>
                ))}
                <div className="grid gap-2 mt-4">
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="Nom" value={cameraForm.name} onChange={(e) => setCameraForm({ ...cameraForm, name: e.target.value })} />
                  <select className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" value={cameraForm.protocol} onChange={(e) => setCameraForm({ ...cameraForm, protocol: e.target.value })}>
                    <option value="hls">HLS</option><option value="webrtc">WebRTC</option><option value="rtsp">RTSP</option><option value="onvif">ONVIF</option>
                  </select>
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="URL" value={cameraForm.url} onChange={(e) => setCameraForm({ ...cameraForm, url: e.target.value })} />
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="Zone" value={cameraForm.zone} onChange={(e) => setCameraForm({ ...cameraForm, zone: e.target.value })} />
                  <button disabled={!canAdmin} className={`rounded-lg px-3 py-2 ${canAdmin ? "bg-blue-600" : "bg-slate-700 opacity-50"}`} onClick={addCamera}>Ajouter caméra</button>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4 grid gap-4">
                <h2 className="text-lg font-semibold">Player HLS</h2>
                <div className="rounded-2xl bg-black min-h-[320px] overflow-hidden grid place-items-center">
                  {activeCamera?.protocol === "hls" ? (
                    <video ref={videoRef} controls autoPlay muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-400">Choisis une caméra HLS</div>
                  )}
                </div>
                <div className="text-sm text-slate-400">{activeCamera ? `${activeCamera.name} , ${activeCamera.zone}` : "aucune caméra sélectionnée"}</div>
              </div>
            </div>
          )}

          {view === "auth" && (
            canAdmin ? <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(profile, null, 2)}</pre> : <div>Accès refusé</div>
          )}

          {view === "connectors" && (
            canConnectors ? <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(connectors, null, 2)}</pre> : <div>Accès refusé</div>
          )}

          {view === "settings" && (
            canAdmin ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-800 p-4 grid gap-2">
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="Palantir Base URL" value={settings.palantirBaseUrl} onChange={(e) => setSettings({ ...settings, palantirBaseUrl: e.target.value })} />
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="Palantir Workspace" value={settings.palantirWorkspace} onChange={(e) => setSettings({ ...settings, palantirWorkspace: e.target.value })} />
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="Satellite Provider" value={settings.satelliteProvider} onChange={(e) => setSettings({ ...settings, satelliteProvider: e.target.value })} />
                  <input className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" placeholder="Flight Provider" value={settings.flightProvider} onChange={(e) => setSettings({ ...settings, flightProvider: e.target.value })} />
                  <select className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" value={settings.securityMode} onChange={(e) => setSettings({ ...settings, securityMode: e.target.value })}>
                    <option value="strict">strict</option><option value="balanced">balanced</option><option value="lab">lab</option>
                  </select>
                  <button className="rounded-lg bg-blue-600 px-3 py-2" onClick={saveSettings}>Sauvegarder</button>
                  <button className="rounded-lg bg-slate-700 px-3 py-2" onClick={() => testConnector("palantir")}>Tester Palantir</button>
                  <button className="rounded-lg bg-slate-700 px-3 py-2" onClick={() => testConnector("satellite")}>Tester Satellite</button>
                  <button className="rounded-lg bg-slate-700 px-3 py-2" onClick={() => testConnector("flights")}>Tester Flights</button>
                </div>
                <pre className="rounded-2xl bg-slate-800 p-4 text-xs whitespace-pre-wrap">{JSON.stringify(testResults, null, 2)}</pre>
              </div>
            ) : <div>Accès refusé</div>
          )}

          {view === "registry" && (
            canConnectors ? <div className="grid gap-4"><pre className="rounded-2xl bg-slate-800 p-4 text-xs whitespace-pre-wrap">{JSON.stringify(sources, null, 2)}</pre><pre className="rounded-2xl bg-slate-800 p-4 text-xs whitespace-pre-wrap">{JSON.stringify(cameras, null, 2)}</pre><pre className="rounded-2xl bg-slate-800 p-4 text-xs whitespace-pre-wrap">{JSON.stringify(connectors, null, 2)}</pre></div> : <div>Accès refusé</div>
          )}

          {view === "palantir" && (
            canConnectors ? <pre className="rounded-2xl bg-slate-800 p-4 text-xs whitespace-pre-wrap">{JSON.stringify(connectors.palantirAdapter || {}, null, 2)}</pre> : <div>Accès refusé</div>
          )}
        </section>
      </main>
    </div>
  );
}
