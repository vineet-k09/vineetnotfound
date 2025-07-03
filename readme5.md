
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
                    <h2 className={fadeClass('projects')}>{visibleText.projects}</h2>
                    <div className="space-y-4">
                        <div>
                            <h3>Endxiety</h3>
                            <p>AI-powered emotional support platform. Built with React + Node + Python.</p>
                        </div>
                        <div>
                            <h3>Saarthi AI</h3>
                            <p>Multilingual government scheme recommender. TypeScript + Chat APIs.</p>
                        </div>
                    </div>

                    {/* 💼 Experience Section */}
                    <h2 className={fadeClass('experience')}>{visibleText.experience}</h2>
                    <div>
                        <h3>Curiosense Innovations</h3>
                        <p>Graphic Design Intern – Created assets, collaborated across product/dev teams.</p>
                    </div>

                    {/* 🎓 Education Section */}
                    <h2 className={fadeClass('education')}>{visibleText.education}</h2>
                    <div>
                        <h3>Acharya Institute of Technology</h3>
                        <p>B.E. in Data Science – CGPA 8.2 (up to 6th sem)</p>
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
                                <td>Vineet</td>
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
