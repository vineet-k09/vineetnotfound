export default function Home() {
	return (
		<main className="max-w-2xl mx-auto my-auto py-16 flex flex-col items-start gap-6">
			<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
				<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
				Clean Slate Initialized
			</div>

			<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
				vineetnotfound
			</h1>

			<p className="text-neutral-400 text-base leading-relaxed">
				Project reset complete. All original content, projects, skills, profile data, and markdown documentation have been backed up into <code className="text-amber-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 font-mono text-sm">/data</code> and preserved on git branch <code className="text-amber-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 font-mono text-sm">archive</code>.
			</p>

			<div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3 font-mono text-xs text-neutral-300">
				<div className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
					Preserved Data Files
				</div>
				<ul className="space-y-1 pl-4 list-disc marker:text-emerald-400">
					<li><code className="text-emerald-400">/data/projects.json</code> — Main & Lab Engineering Projects</li>
					<li><code className="text-emerald-400">/data/profile.json</code> — Bio, Education, Focus Areas & Shell Scripts</li>
					<li><code className="text-emerald-400">/data/skills.json</code> — Languages, Frameworks, DBs & DevOps</li>
					<li><code className="text-emerald-400">/data/gallery.json</code> — UI/UX Mockups & Design Work</li>
					<li><code className="text-emerald-400">/data/docs/</code> — Design Plans & Markdown Guides</li>
				</ul>
			</div>

			<footer className="text-xs text-neutral-500 pt-4 border-t border-neutral-900 w-full flex items-center justify-between">
				<span>Ready to build the next iteration.</span>
				<span className="font-mono">R.I.P. v1 &bull; Fresh Start</span>
			</footer>
		</main>
	);
}
