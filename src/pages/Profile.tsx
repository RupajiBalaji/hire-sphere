export function Profile() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md">

        {/* Profile Header */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="h-28 w-28 rounded-full"
            />

            <h1 className="mt-4 text-2xl font-bold">
              Rishitha K
            </h1>

            <p className="text-muted-foreground">
              Frontend Developer • UI/UX Designer
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              📍 Hyderabad • 🎓 B.Tech ECE
            </p>
          </div>
        </div>

        {/* Proof Score */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="text-lg font-bold">Proof Score</h2>

          <div className="mt-3 text-4xl font-extrabold text-primary">
            860
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <StatCard title="Tasks" value="24" />
            <StatCard title="Projects" value="8" />
            <StatCard title="Views" value="37" />
            <StatCard title="Shortlists" value="5" />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="text-lg font-bold">Skills</h2>

          <SkillBar name="React" value={92} />
          <SkillBar name="Java" value={85} />
          <SkillBar name="Figma" value={88} />
          <SkillBar name="UI Design" value={90} />
        </div>

        {/* Projects */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="text-lg font-bold">Projects</h2>

          <ProjectCard
            title="Landing Page Design"
            badge="⭐ Recruiter Approved"
          />

          <ProjectCard
            title="React Dashboard"
            badge="🏆 Top 10%"
          />
        </div>

        {/* Recruiter Activity */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="text-lg font-bold">
            Recruiter Activity
          </h2>

          <div className="mt-4 space-y-3">
            <ActivityRow label="Profile Views" value="42" />
            <ActivityRow label="Profile Saves" value="8" />
            <ActivityRow label="Shortlists" value="5" />
            <ActivityRow label="Interview Requests" value="2" />
          </div>
        </div>

        {/* Badges */}
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="text-lg font-bold">Achievements</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge text="🏆 Top UI Designer" />
            <Badge text="⭐ Recruiter Favorite" />
            <Badge text="🔥 React Expert" />
            <Badge text="🚀 Fast Learner" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }:  { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-muted p-3 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">
        {title}
      </div>
    </div>
  );
}

function SkillBar({ name, value }:  { name: string; value: number }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <span>{name}</span>
        <span>{value}%</span>
      </div>

      <div className="mt-1 h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ title, badge }:  { title: string; badge: string }) {
  return (
    <div className="mt-3 rounded-2xl border p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm">{badge}</p>
    </div>
  );
}

function ActivityRow({ label, value }:  { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function Badge({ text }:  { text: string }) {
  return (
    <span className="rounded-full bg-primary/10 px-3 py-2 text-sm">
      {text}
    </span>
  );
}
