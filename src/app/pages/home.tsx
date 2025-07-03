//src/app/home.tsx
import { useLang } from '../../hooks/useLang';

export default function Home() {
    const { visibleText, fadeClass, changeLang } = useLang();

    return (
        <div className="container mt-10">
            <div className="grid-layout">
                <div className="content-area">
                    {/* 🧍 Hero Section */}
                    <h1 className={fadeClass('name')}>{visibleText.name}</h1>
                    <p className={fadeClass('role')}>{visibleText.role}</p>
                    <button onClick={changeLang}>
                        {visibleText.toggleLangBtn ?? "Change Language"}
                    </button>

                    {/* 🛠️ Skills Section */}
                    <h2 className={fadeClass('skills')}>{visibleText.skills}</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        <li>React</li>
                        <li>Node.js</li>
                        <li>MongoDB</li>
                        <li>Python</li>
                        <li>TypeScript</li>
                        <li>TailwindCSS</li>
                        <li>Git</li>
                        <li>Docker</li>
                    </ul>

                    {/* 🚀 Projects Section */}
                    <h2 className={fadeClass('projects')}>{visibleText.projects.mainLabel}</h2>
                    <div className="space-y-4">
                        {visibleText.projects.list.map((project, idx) => (
                            <div key={idx}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* 💼 Experience Section */}
                    <h2 className={fadeClass('experience')}>{visibleText.experience.mainLabel}</h2>
                    <div className="space-y-4">
                        {visibleText.experience.list.map((exp, idx) => (
                            <div key={idx}>
                                <h3>{exp.title} – {exp.company}</h3>
                                <p>{exp.description} ({exp.duration})</p>
                            </div>
                        ))}
                    </div>

                    {/* 🎓 Education Section */}
                    <h2 className={fadeClass('education')}>{visibleText.education.mainLabel}</h2>
                    <div className="space-y-4">
                        {visibleText.education.list.map((edu, idx) => (
                            <div key={idx}>
                                <h3>{edu.degree}</h3>
                                <p>{edu.institute} – {edu.location}</p>
                                <p>{edu.duration}</p>
                                <p>{edu.cgpa}</p>
                                <ul className="list-disc ml-6">
                                    {edu.courses.map((course, i) => (
                                        <li key={i}>{course}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 📋 Example Table and Code */}
                    <h2>Tables? Sure.</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{visibleText.name}</td>
                                <td>Developer</td>
                            </tr>
                            <tr>
                                <td>GPT</td>
                                <td>Sidekick</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Code Snippet</h2>
                    <pre>
                        <code>const hello = world;</code>
                    </pre>

                    <h2>List of Awesomeness</h2>
                    <ul>
                        <li>Responsive as hell</li>
                        <li>Grid-powered layout</li>
                        <li>Dark mode friendly</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
