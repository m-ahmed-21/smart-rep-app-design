import { useEffect, useMemo, useState, type ComponentProps, type ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  BatteryMedium,
  Bluetooth,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Dumbbell,
  Eye,
  EyeOff,
  Flashlight,
  GalleryHorizontal,
  LockKeyhole,
  Minus,
  Pause,
  Phone,
  Play,
  Plus,
  QrCode,
  RotateCcw,
  ScanLine,
  Share2,
  ShieldCheck,
  Signal,
  Sparkles,
  TimerReset,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Wifi,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/smartrep-mark.svg.asset.json";
import latPulldownAsset from "@/assets/lat-pulldown.png.asset.json";

type Screen =
  | "auth"
  | "scan"
  | "connecting"
  | "reservation"
  | "calibration"
  | "profile"
  | "tracking"
  | "rest"
  | "summary"
  | "unavailable";

const screens: { id: Screen; label: string; step: string }[] = [
  { id: "auth", label: "Sign in", step: "01" },
  { id: "scan", label: "Scan machine", step: "02" },
  { id: "connecting", label: "BLE connection", step: "03" },
  { id: "reservation", label: "Reserve machine", step: "04" },
  { id: "calibration", label: "Calibration", step: "05" },
  { id: "tracking", label: "Live tracking", step: "06" },
  { id: "rest", label: "Rest timer", step: "07" },
  { id: "summary", label: "Session summary", step: "08" },
  { id: "profile", label: "Profile & progress", step: "09" },
  { id: "unavailable", label: "Machine reserved", step: "10" },
];

const nextScreen: Partial<Record<Screen, Screen>> = {
  auth: "scan",
  scan: "connecting",
  connecting: "reservation",
  reservation: "calibration",
  calibration: "tracking",
  tracking: "rest",
  rest: "tracking",
  summary: "profile",
  unavailable: "scan",
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src={logoAsset.url} alt="SmartRep" className={cn("shrink-0", compact ? "size-9" : "size-16")} />
      <div>
        <div className={cn("font-display font-bold leading-none", compact ? "text-xl" : "text-3xl")}>
          SMART<span className="text-muted-foreground">REP</span>
        </div>
        {!compact && <p className="mt-1 text-xs uppercase text-muted-foreground">Move with intent</p>}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-8 items-center justify-between px-5 text-[11px] font-semibold text-muted-foreground">
      <span>4:10</span>
      <div className="flex items-center gap-1.5" aria-label="Phone status">
        <Signal className="size-3" />
        <Wifi className="size-3" />
        <BatteryMedium className="size-4" />
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative mx-auto h-[844px] w-full max-w-[390px] overflow-hidden bg-background text-foreground sm:rounded-[34px] sm:border sm:border-border sm:shadow-phone">
      <StatusBar />
      <div className="h-[calc(100%-2rem)] overflow-y-auto overscroll-contain scrollbar-none">{children}</div>
    </main>
  );
}

function TopBar({ title, onBack, action }: { title: string; onBack?: () => void; action?: ReactNode }) {
  return (
    <header className="flex h-14 items-center justify-between px-5">
      <div className="flex min-w-10 items-center">
        {onBack && (
          <Button aria-label="Go back" variant="ghost" size="icon" onClick={onBack} className="-ml-2 rounded-full">
            <ArrowLeft />
          </Button>
        )}
      </div>
      <h1 className="font-display text-base font-semibold uppercase">{title}</h1>
      <div className="flex min-w-10 justify-end">{action}</div>
    </header>
  );
}

function BottomNav({ active, go }: { active: "progress" | "scan" | "profile"; go: (screen: Screen) => void }) {
  const items = [
    { id: "progress", label: "Progress", icon: TrendingUp, screen: "summary" as Screen },
    { id: "scan", label: "Scan", icon: ScanLine, screen: "scan" as Screen },
    { id: "profile", label: "Profile", icon: CircleUserRound, screen: "profile" as Screen },
  ];
  return (
    <nav className="sticky bottom-0 grid grid-cols-3 border-t border-border bg-background/95 px-3 pb-3 pt-2 backdrop-blur">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => go(item.screen)}
            className={cn(
              "h-12 flex-col gap-1 rounded-sm text-[10px] font-medium",
              active === item.id ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className={cn("size-5", active === item.id && "stroke-[2.5]")} />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}

function PrimaryButton({ children, className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button className={cn("h-14 w-full rounded-sm text-sm font-bold uppercase", className)} {...props}>
      {children}
    </Button>
  );
}

function LatPulldown({ className, faded = false }: { className?: string; faded?: boolean }) {
  return (
    <img
      src={latPulldownAsset.url}
      alt="Lat Pulldown machine"
      className={cn("object-contain invert", faded && "opacity-45", className)}
    />
  );
}

function AuthScreen({ go }: { go: (screen: Screen) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative min-h-full px-6 pb-8 pt-8">
      <div className="pointer-events-none absolute -right-16 top-20 grid rotate-12 grid-cols-2 gap-4 opacity-[0.035]">
        {Array.from({ length: 8 }).map((_, index) => (
          <img key={index} src={logoAsset.url} alt="" className="size-28" />
        ))}
      </div>
      <div className="relative flex min-h-[744px] flex-col">
        <Logo />
        <div className="mt-auto">
          <p className="text-xs font-bold uppercase text-muted-foreground">Your strongest rep starts here</p>
          <h1 className="mt-3 max-w-xs font-display text-5xl font-bold leading-[0.92] uppercase">
            Train with<br />precision.
          </h1>
          <div className="mt-8 grid grid-cols-2 border-b border-border">
            {(["login", "signup"] as const).map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => setMode(item)}
                className={cn(
                  "h-11 rounded-none border-b-2 text-xs uppercase",
                  mode === item ? "border-foreground text-foreground" : "border-transparent text-muted-foreground",
                )}
              >
                {item === "login" ? "Sign in" : "Create account"}
              </Button>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {mode === "signup" && <Field icon={UserRound} label="Full name" value="Muhammad Umar" />}
            <Field icon={Phone} label="Phone number" value="+92 300 1234567" />
            <div className="relative">
              <Field icon={LockKeyhole} label="Password" value={showPassword ? "smartrep26" : "••••••••••"} />
              <Button
                variant="ghost"
                size="icon"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
          <PrimaryButton className="mt-5" onClick={() => go("scan")}>
            {mode === "login" ? "Continue" : "Create account"} <ChevronRight />
          </PrimaryButton>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
            By continuing, you agree to SmartRep's Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <label className="flex h-14 items-center gap-3 border border-border bg-card px-4">
      <Icon className="size-4 text-muted-foreground" />
      <span className="sr-only">{label}</span>
      <input aria-label={label} defaultValue={value} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
    </label>
  );
}

function ScanScreen({ go }: { go: (screen: Screen) => void }) {
  const [torch, setTorch] = useState(false);
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Scan machine" action={<Bluetooth className="size-4 text-quality-good" />} />
      <div className="px-5">
        <div className="relative h-[500px] overflow-hidden rounded-sm bg-camera">
          <div className="absolute inset-0 camera-grid opacity-40" />
          <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 scan-frame">
            <div className="scan-line" />
            <div className="absolute inset-12 grid place-items-center border border-foreground/20 bg-background/60 backdrop-blur-sm">
              <QrCode className="size-16" strokeWidth={1.2} />
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-4">
            <Button
              size="icon"
              variant={torch ? "default" : "secondary"}
              onClick={() => setTorch((value) => !value)}
              aria-label="Toggle flashlight"
              className="size-12 rounded-full"
            >
              <Flashlight />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Open gallery" className="size-12 rounded-full">
              <GalleryHorizontal />
            </Button>
          </div>
        </div>
        <div className="py-6 text-center">
          <h1 className="font-display text-2xl font-bold uppercase">Align the machine QR</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Scanning identifies the machine and securely starts Bluetooth pairing.
          </p>
          <PrimaryButton className="mt-5" onClick={() => go("connecting")}>
            <Camera /> Simulate scan
          </PrimaryButton>
          <Button variant="ghost" className="mt-1 text-xs text-muted-foreground" onClick={() => go("unavailable")}>
            Preview reserved machine
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConnectingScreen({ go }: { go: (screen: Screen) => void }) {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setConnected(true), 1500);
    return () => window.clearTimeout(timeout);
  }, []);
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Bluetooth pairing" onBack={() => go("scan")} />
      <div className="flex flex-1 flex-col px-6 pb-7">
        <div className="relative mt-6 grid place-items-center">
          {!connected && <div className="absolute size-28 animate-ping rounded-full border border-muted-foreground/20" />}
          <div className={cn("grid size-24 place-items-center rounded-full border", connected ? "border-quality-good bg-quality-good/10" : "border-border bg-card")}>
            {connected ? <Check className="size-10 text-quality-good" /> : <Bluetooth className="size-10 animate-pulse" />}
          </div>
        </div>
        <div className="mt-5 text-center" aria-live="polite">
          <p className={cn("text-xs font-bold uppercase", connected ? "text-quality-good" : "text-muted-foreground")}>
            {connected ? "Sensor stream live" : "Connecting to SR-LP-014"}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase">{connected ? "Lat Pulldown" : "Hold steady"}</h1>
        </div>
        <LatPulldown className="mx-auto mt-2 h-56 w-full" />
        <div className="grid grid-cols-3 divide-x divide-border border-y border-border py-4 text-center">
          <Stat label="Signal" value="−42 dBm" />
          <Stat label="Sensor" value="Hall + IMU" />
          <Stat label="Battery" value="84%" />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Cable resistance machine for controlled vertical pulling. Targets the lats, upper back, and biceps.
        </p>
        <PrimaryButton className="mt-auto" disabled={!connected} onClick={() => go("reservation")}>
          Start lifting <ChevronRight />
        </PrimaryButton>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs font-semibold">{value}</p>
    </div>
  );
}

function Stepper({ label, value, setValue, min, max }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-5">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline" aria-label={`Decrease ${label}`} onClick={() => setValue(Math.max(min, value - 1))}>
          <Minus />
        </Button>
        <span className="w-10 text-center font-display text-3xl font-bold">{value}</span>
        <Button size="icon" variant="outline" aria-label={`Increase ${label}`} onClick={() => setValue(Math.min(max, value + 1))}>
          <Plus />
        </Button>
      </div>
    </div>
  );
}

function ReservationScreen({ go }: { go: (screen: Screen) => void }) {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Reserve machine" onBack={() => go("connecting")} />
      <div className="flex flex-1 flex-col px-6 pb-7">
        <div className="mt-4 flex items-center gap-5 border-y border-border py-5">
          <LatPulldown className="h-28 w-32 shrink-0" />
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-quality-good">
              <span className="size-1.5 rounded-full bg-quality-good" /> Available now
            </span>
            <h1 className="mt-2 font-display text-2xl font-bold uppercase">Lat Pulldown</h1>
            <p className="mt-1 text-xs text-muted-foreground">Station LP-014 · Floor 01</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold uppercase text-muted-foreground">Plan this exercise</p>
          <Stepper label="Number of sets" value={sets} setValue={setSets} min={1} max={8} />
          <Stepper label="Reps per set" value={reps} setValue={setReps} min={1} max={30} />
        </div>
        <div className="mt-6 flex gap-3 border border-border bg-card p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            This station is held for you until all {sets} sets are complete or you end the exercise.
          </p>
        </div>
        <div className="mt-auto">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground">Planned volume</p>
              <p className="font-display text-3xl font-bold">{sets * reps} REPS</p>
            </div>
            <p className="text-xs text-muted-foreground">≈ {sets * 2} min</p>
          </div>
          <PrimaryButton onClick={() => go("calibration")}>Reserve & continue <ChevronRight /></PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function CalibrationScreen({ go }: { go: (screen: Screen) => void }) {
  const [rep, setRep] = useState(0);
  const complete = rep >= 5;
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Personal calibration" onBack={() => go("reservation")} action={<span className="text-xs text-muted-foreground">1 of 1</span>} />
      <div className="flex flex-1 flex-col px-6 pb-7">
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Baseline set</p>
            <h1 className="mt-1 font-display text-4xl font-bold uppercase">{complete ? "Baseline ready" : "5 natural reps"}</h1>
          </div>
          <span className="font-display text-4xl font-bold">{Math.min(rep, 5)}<span className="text-lg text-muted-foreground">/5</span></span>
        </div>
        <div className="mt-6 h-1 bg-secondary">
          <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${Math.min(rep / 5, 1) * 100}%` }} />
        </div>
        <div className="relative mt-8 flex h-[350px] items-center justify-center border-y border-border">
          <LatPulldown className="h-48 w-48" />
          <div className="absolute right-4 top-8 flex h-64 items-center gap-3">
            <div className="relative h-full w-3 rounded-full bg-secondary">
              <div className="absolute bottom-0 left-0 w-full rounded-full bg-foreground transition-all duration-500" style={{ height: `${20 + (rep % 5) * 17}%` }} />
              <span className="absolute -left-1 bottom-[72%] size-5 rounded-full border-4 border-background bg-foreground shadow-ring" />
            </div>
            <div className="flex h-full flex-col justify-between text-[9px] uppercase text-muted-foreground"><span>Max</span><span>Min</span></div>
          </div>
          {!complete && <div className="absolute bottom-5 left-5"><p className="text-[10px] uppercase text-muted-foreground">Current phase</p><p className="mt-1 text-sm font-bold uppercase">Pull · controlled</p></div>}
          {complete && (
            <div className="absolute inset-0 grid place-items-center bg-background/85 backdrop-blur-sm">
              <div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-quality-good/10"><Check className="size-8 text-quality-good" /></div><p className="mt-4 text-sm font-bold uppercase">Personal range captured</p><p className="mt-1 text-xs text-muted-foreground">Targets now adapt to your movement.</p></div>
            </div>
          )}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Use a comfortable weight and your natural full range. SmartRep will learn your movement—not force a generic target.
        </p>
        <PrimaryButton className="mt-auto" onClick={() => complete ? go("tracking") : setRep((value) => value + 1)}>
          {complete ? <>Begin workout <ChevronRight /></> : <><Dumbbell /> Log calibration rep</>}
        </PrimaryButton>
      </div>
    </div>
  );
}

function RomBar({ value }: { value: number }) {
  return (
    <div className="flex h-64 items-center gap-4">
      <div className="relative h-full w-9 rounded-full border border-border bg-secondary p-1">
        <div className="grid h-full grid-rows-4 overflow-hidden rounded-full opacity-85">
          <div className="bg-quality-poor" /><div className="bg-quality-warn" /><div className="bg-quality-good" /><div className="bg-quality-poor" />
        </div>
        <div className="absolute left-1/2 z-10 size-7 -translate-x-1/2 translate-y-1/2 rounded-full border-[6px] border-background bg-foreground shadow-ring transition-all duration-700" style={{ bottom: `${value}%` }} />
      </div>
      <div className="flex h-full flex-col justify-between py-1 text-[9px] font-bold uppercase text-muted-foreground"><span>Maximum</span><span>Target range</span><span>Minimum</span></div>
    </div>
  );
}

function SpeedGauge({ speed }: { speed: number }) {
  const angle = -70 + Math.min(speed / 1.8, 1) * 140;
  const status = speed < 0.55 ? "Too slow" : speed < 0.8 ? "Slow" : speed <= 1.25 ? "Ideal" : speed <= 1.5 ? "Fast" : "Too fast";
  const qualityClass = status === "Ideal" ? "text-quality-good" : status === "Slow" || status === "Fast" ? "text-quality-warn" : "text-quality-poor";
  return (
    <div className="text-center">
      <svg viewBox="0 0 180 110" className="mx-auto w-full max-w-44" aria-label={`Speed ${speed.toFixed(2)} meters per second, ${status}`}>
        <path d="M25 90a65 65 0 0 1 130 0" fill="none" stroke="var(--secondary)" strokeWidth="15" strokeLinecap="round" />
        <path d="M39 52a65 65 0 0 1 102 0" fill="none" stroke="var(--quality-good)" strokeWidth="15" strokeLinecap="butt" />
        <g transform={`rotate(${angle} 90 90)`} className="transition-transform duration-700"><path d="M90 90L86 38h8z" fill="currentColor" /><circle cx="90" cy="90" r="8" fill="var(--foreground)" /></g>
      </svg>
      <p className="-mt-4 font-display text-3xl font-bold">{speed.toFixed(2)}<span className="ml-1 text-xs text-muted-foreground">m/s</span></p>
      <p className={cn("mt-1 text-xs font-bold uppercase", qualityClass)}>{status}</p>
    </div>
  );
}

function TrackingScreen({ go }: { go: (screen: Screen) => void }) {
  const [rep, setRep] = useState(6);
  const [warning, setWarning] = useState(false);
  const data = useMemo(() => {
    const values = [86, 91, 94, 88, 82, 74, 68, 92, 89, 85];
    const rom = values[(rep - 1) % values.length] ?? 86;
    const speeds = [0.92, 1.02, 1.1, 0.98, 0.84, 0.62, 0.54, 1.08, 0.93, 0.88];
    return { rom, speed: speeds[(rep - 1) % speeds.length] ?? 0.92 };
  }, [rep]);
  const advance = () => {
    if (rep >= 10) { go("rest"); return; }
    const next = rep + 1;
    setRep(next);
    if (next === 7) setWarning(true);
  };
  return (
    <div className="relative flex min-h-full flex-col pb-5">
      <TopBar
        title="Lat Pulldown"
        onBack={() => go("reservation")}
        action={<Button variant="ghost" size="icon" aria-label="Pause workout" onClick={() => go("rest")} className="rounded-full"><Pause /></Button>}
      />
      <div className="px-5">
        <div className="flex items-end justify-between border-b border-border pb-5 pt-2">
          <div>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Set 2 of 3</p>
            <p className="font-display text-[88px] font-bold leading-[0.82]">{rep}<span className="text-2xl text-muted-foreground">/10</span></p>
          </div>
          <div className="pb-1 text-right"><p className="text-[10px] uppercase text-muted-foreground">Last rep</p><p className="mt-1 text-sm font-bold text-quality-good">GOOD · 87</p><p className="mt-1 text-[10px] text-quality-good">+3 vs previous</p></div>
        </div>
        <div className="grid grid-cols-[1fr_1.08fr] gap-4 border-b border-border py-5">
          <div>
            <div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase text-muted-foreground">Range of motion</p><p className="mt-1 font-display text-4xl font-bold">{data.rom}%</p></div><span className={cn("text-[10px] font-bold", data.rom > 80 ? "text-quality-good" : "text-quality-warn")}>{data.rom > 80 ? "+2%" : "−8%"}</span></div>
            <RomBar value={Math.max(18, Math.min(data.rom, 92))} />
          </div>
          <div className="border-l border-border pl-4">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Rep speed</p>
            <SpeedGauge speed={data.speed} />
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-muted-foreground">Top pause</span><span className="font-display text-2xl font-bold">0.8<span className="text-xs text-muted-foreground">s</span></span></div>
              <div className="mt-2 flex gap-1"><span className="h-1 flex-[2] bg-quality-good" /><span className="h-1 flex-1 bg-secondary" /><span className="h-1 flex-1 bg-secondary" /></div>
              <p className="mt-2 text-[10px] font-bold uppercase text-quality-good">Pause held</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border py-4 text-center">
          <Stat label="Tempo" value="2.1 · 0.8 · 2.4" /><Stat label="Consistency" value="91%" /><Stat label="Set quality" value="86 / 100" />
        </div>
        <PrimaryButton className="mt-5" onClick={advance}>{rep >= 10 ? "Finish set" : "Simulate next rep"} <Activity /></PrimaryButton>
        <Button variant="ghost" className="mt-1 w-full text-xs text-muted-foreground" onClick={() => setWarning(true)}>Preview form alert</Button>
      </div>
      {warning && (
        <div className="absolute inset-x-4 bottom-5 z-20 border border-quality-warn/40 bg-popover p-4 shadow-alert" role="alert">
          <div className="flex items-start gap-3"><div className="grid size-9 shrink-0 place-items-center rounded-full bg-quality-warn/10"><TriangleAlert className="size-5 text-quality-warn" /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><p className="text-xs font-bold uppercase">Form is drifting</p><Button variant="ghost" size="icon" aria-label="Dismiss warning" onClick={() => setWarning(false)} className="-mr-2 -mt-2 size-8 rounded-full"><X /></Button></div><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Your range dropped 12%. Keep your chest tall—you’re close. Two strong reps left.</p></div></div>
        </div>
      )}
    </div>
  );
}

function RestScreen({ go }: { go: (screen: Screen) => void }) {
  const [seconds, setSeconds] = useState(75);
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="flex min-h-full flex-col px-6 pb-7">
      <div className="flex h-14 items-center justify-between"><Logo compact /><span className="text-xs text-muted-foreground">SET 2 / 3</span></div>
      <div className="mt-6 text-center"><p className="text-xs font-bold uppercase text-quality-good">Set complete</p><h1 className="mt-2 font-display text-4xl font-bold uppercase">Recover with purpose</h1></div>
      <div className="relative mx-auto mt-12 grid size-64 place-items-center rounded-full border border-border">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 256 256"><circle cx="128" cy="128" r="122" fill="none" stroke="var(--secondary)" strokeWidth="6" /><circle cx="128" cy="128" r="122" fill="none" stroke="var(--foreground)" strokeWidth="6" strokeLinecap="round" pathLength="100" strokeDasharray={`${seconds / 0.9} 100`} /></svg>
        <div><p className="font-display text-7xl font-bold tabular-nums">{formatted}</p><p className="mt-2 text-xs uppercase text-muted-foreground">Until set 3</p></div>
      </div>
      <div className="mt-10 grid grid-cols-3 divide-x divide-border border-y border-border py-4 text-center"><Stat label="Reps" value="10 / 10" /><Stat label="Avg. quality" value="86" /><Stat label="Avg. ROM" value="88%" /></div>
      <div className="mt-5 flex justify-center gap-3"><Button variant="outline" onClick={() => setSeconds((v) => Math.max(0, v - 15))}>−15 sec</Button><Button variant="outline" onClick={() => setSeconds((v) => v + 15)}>+15 sec</Button></div>
      <div className="mt-auto space-y-2"><PrimaryButton onClick={() => go("tracking")}><Play /> Begin set 3</PrimaryButton><Button variant="ghost" className="w-full text-xs text-muted-foreground" onClick={() => go("summary")}>End workout & view summary</Button></div>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const points = values.map((value, i) => `${8 + i * (284 / (values.length - 1))},${100 - value * 0.78}`).join(" ");
  return <svg viewBox="0 0 300 110" className="h-28 w-full" aria-label="Performance trend"><path d="M8 100H292M8 65H292M8 30H292" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 5" /><polyline points={points} fill="none" stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />{values.map((value, i) => <circle key={i} cx={8 + i * (284 / (values.length - 1))} cy={100 - value * .78} r="3" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2" />)}</svg>;
}

function SummaryScreen({ go }: { go: (screen: Screen) => void }) {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Session summary" action={<Button variant="ghost" size="icon" aria-label="Share summary" className="rounded-full"><Share2 /></Button>} />
      <div className="px-5 pb-4">
        <div className="border-b border-border pb-6 pt-3"><p className="text-xs font-bold uppercase text-quality-good">Workout complete</p><h1 className="mt-2 font-display text-5xl font-bold uppercase">Strong finish.</h1><p className="mt-2 text-sm text-muted-foreground">Lat Pulldown · 6 min 42 sec</p></div>
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border py-5 text-center"><div><p className="font-display text-3xl font-bold">30</p><p className="text-[9px] uppercase text-muted-foreground">Total reps</p></div><div><p className="font-display text-3xl font-bold">3/3</p><p className="text-[9px] uppercase text-muted-foreground">Sets</p></div><div><p className="font-display text-3xl font-bold">87</p><p className="text-[9px] uppercase text-muted-foreground">Quality</p></div></div>
        <section className="py-5"><div className="flex items-center justify-between"><h2 className="text-xs font-bold uppercase">ROM & tempo trend</h2><span className="text-[10px] font-bold text-quality-good">+6.4% TODAY</span></div><Sparkline values={[62, 70, 66, 76, 82, 79, 88, 91]} /><div className="flex justify-between text-[9px] uppercase text-muted-foreground"><span>Set 1</span><span>Set 2</span><span>Set 3</span></div></section>
        <section className="border-y border-border py-5"><h2 className="text-xs font-bold uppercase">Rep quality</h2><div className="mt-4 flex h-3 overflow-hidden rounded-full"><span className="bg-quality-good" style={{ width: "73%" }} /><span className="bg-quality-warn" style={{ width: "20%" }} /><span className="bg-quality-poor" style={{ width: "7%" }} /></div><div className="mt-3 grid grid-cols-3 text-[10px]"><span><b className="text-quality-good">22</b> good</span><span><b className="text-quality-warn">6</b> moderate</span><span><b className="text-quality-poor">2</b> poor</span></div></section>
        <div className="mt-5 flex gap-3 border border-border bg-card p-4"><Sparkles className="mt-0.5 size-5 shrink-0 text-quality-good" /><div><p className="text-xs font-bold uppercase">Coach insight</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Your tempo stayed consistent. Fatigue appeared at rep 7 in set 2, but you recovered after rest.</p></div></div>
        <PrimaryButton className="mt-5" onClick={() => go("profile")}>Done <Check /></PrimaryButton>
      </div>
    </div>
  );
}

function ProfileScreen({ go }: { go: (screen: Screen) => void }) {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Profile" action={<Button variant="ghost" size="icon" aria-label="Refresh profile" className="rounded-full"><RotateCcw /></Button>} />
      <div className="flex-1 px-5">
        <div className="flex items-center gap-4 border-b border-border py-5"><div className="grid size-20 shrink-0 place-items-center rounded-full bg-secondary font-display text-2xl font-bold">MU</div><div><h1 className="font-display text-3xl font-bold uppercase">Muhammad Umar</h1><p className="mt-1 text-xs text-muted-foreground">Age 22 · +92 300 1234567</p><span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-quality-good"><Check className="size-3" /> Baseline calibrated</span></div></div>
        <section className="py-5"><div className="flex items-center justify-between"><h2 className="text-xs font-bold uppercase">Personal baseline</h2><Button variant="ghost" className="h-8 px-2 text-[10px] uppercase" onClick={() => go("calibration")}>Recalibrate</Button></div><div className="mt-3 grid grid-cols-2 gap-px bg-border"><Metric label="ROM range" value="48–92" suffix="cm" /><Metric label="Ideal speed" value="0.8–1.2" suffix="m/s" /><Metric label="Top pause" value="0.7–1.1" suffix="sec" /><Metric label="Confidence" value="94" suffix="%" /></div></section>
        <section className="border-t border-border py-5"><div className="flex justify-between"><div><h2 className="text-xs font-bold uppercase">30-day progress</h2><p className="mt-1 text-[10px] text-muted-foreground">Average rep quality</p></div><div className="text-right"><p className="font-display text-2xl font-bold text-quality-good">+12.8%</p><p className="text-[9px] uppercase text-muted-foreground">Improvement</p></div></div><Sparkline values={[55, 58, 61, 64, 72, 70, 81, 86]} /></section>
        <section className="border-t border-border py-4"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><Dumbbell className="size-5" /><div><p className="text-xs font-semibold">Lat Pulldown</p><p className="text-[10px] text-muted-foreground">Most trained · 8 sessions</p></div></div><ChevronRight className="size-4 text-muted-foreground" /></div></section>
      </div>
      <BottomNav active="profile" go={go} />
    </div>
  );
}

function Metric({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return <div className="bg-card p-4"><p className="text-[9px] uppercase text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl font-bold">{value}<span className="ml-1 text-[10px] text-muted-foreground">{suffix}</span></p></div>;
}

function UnavailableScreen({ go }: { go: (screen: Screen) => void }) {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar title="Machine status" onBack={() => go("scan")} />
      <div className="flex flex-1 flex-col px-6 pb-7 text-center">
        <div className="mx-auto mt-7 grid size-20 place-items-center rounded-full bg-quality-warn/10"><LockKeyhole className="size-9 text-quality-warn" /></div>
        <p className="mt-5 text-xs font-bold uppercase text-quality-warn">Currently reserved</p><h1 className="mt-2 font-display text-4xl font-bold uppercase">Lat Pulldown</h1><p className="mt-2 text-xs text-muted-foreground">Station LP-014 · Floor 01</p>
        <LatPulldown className="mx-auto mt-4 h-56 w-full" />
        <div className="border-y border-border py-5 text-left"><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase text-muted-foreground">Current workout</p><p className="mt-1 text-sm font-semibold">Anonymous member</p></div><span className="font-display text-2xl font-bold">2<span className="text-sm text-muted-foreground"> / 3 sets</span></span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full w-2/3 bg-quality-warn" /></div><div className="mt-3 flex justify-between text-[10px] text-muted-foreground"><span>Set 2 in progress</span><span>≈ 4 min remaining</span></div></div>
        <div className="mt-5 flex gap-3 border border-border bg-card p-4 text-left"><Clock3 className="mt-0.5 size-5 shrink-0" /><p className="text-xs leading-relaxed text-muted-foreground">We'll refresh availability automatically. No personal workout details are shared.</p></div>
        <PrimaryButton className="mt-auto" onClick={() => go("scan")}><ScanLine /> Scan another machine</PrimaryButton>
      </div>
    </div>
  );
}

export function SmartRepApp() {
  const [screen, setScreen] = useState<Screen>("auth");
  const go = (target: Screen) => setScreen(target);
  return (
    <div className="min-h-screen bg-stage px-0 py-0 sm:px-6 sm:py-8 lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-8 lg:px-10">
      <aside className="sticky top-8 hidden h-[844px] flex-col border border-border bg-background p-5 lg:flex">
        <Logo compact />
        <p className="mt-8 text-[10px] font-bold uppercase text-muted-foreground">Interactive prototype</p>
        <nav className="mt-4 space-y-1" aria-label="Prototype screens">
          {screens.map((item) => (
            <Button key={item.id} variant="ghost" onClick={() => go(item.id)} className={cn("h-11 w-full justify-start rounded-sm px-3 text-xs", screen === item.id ? "bg-accent text-foreground" : "text-muted-foreground")}>
              <span className="w-6 font-mono text-[9px]">{item.step}</span>{item.label}
            </Button>
          ))}
        </nav>
        <div className="mt-auto border-t border-border pt-4"><p className="text-[10px] leading-relaxed text-muted-foreground">SmartRep PoC · Simulated sensor data<br />BLE 5.0 · Lat Pulldown LP-014</p></div>
      </aside>
      <div>
        <div className="mx-auto hidden max-w-[390px] items-center justify-between pb-3 sm:flex lg:hidden">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Prototype screen</p>
          <select value={screen} onChange={(event) => go(event.target.value as Screen)} className="border border-border bg-background px-3 py-2 text-xs outline-none">
            {screens.map((item) => <option key={item.id} value={item.id}>{item.step} · {item.label}</option>)}
          </select>
        </div>
        <PhoneShell>
          {screen === "auth" && <AuthScreen go={go} />}
          {screen === "scan" && <ScanScreen go={go} />}
          {screen === "connecting" && <ConnectingScreen go={go} />}
          {screen === "reservation" && <ReservationScreen go={go} />}
          {screen === "calibration" && <CalibrationScreen go={go} />}
          {screen === "tracking" && <TrackingScreen go={go} />}
          {screen === "rest" && <RestScreen go={go} />}
          {screen === "summary" && <SummaryScreen go={go} />}
          {screen === "profile" && <ProfileScreen go={go} />}
          {screen === "unavailable" && <UnavailableScreen go={go} />}
        </PhoneShell>
        <div className="mx-auto mt-3 hidden max-w-[390px] items-center justify-between text-[10px] uppercase text-muted-foreground sm:flex">
          <span>{screens.find((item) => item.id === screen)?.label}</span>
          {nextScreen[screen] && <Button variant="ghost" className="h-7 px-2 text-[10px]" onClick={() => go(nextScreen[screen] ?? "scan")}>Next screen <ChevronRight /></Button>}
        </div>
      </div>
    </div>
  );
}