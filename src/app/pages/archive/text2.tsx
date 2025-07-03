//src/app/pages/test2/tsx
import { useLang } from '../../../hooks/useLang';
import './test.css'

export default function Test2() {

    const { visibleText, fadeClass, changeLang } = useLang()


    return (
        <div className="bg-pink-50 text-amber-900">
            <h1 className=""><span className={fadeClass('name')}>{visibleText.name}</span></h1>
            <h1 className=""><span className={fadeClass('role')}>{visibleText.role}</span></h1>
            <h1 className=""><span className={fadeClass('skills')}>{visibleText.skills}</span></h1>
            <h1 className=""><span className={fadeClass('projects')}>{visibleText.projects}</span></h1>
            <button onClick={changeLang}>Change Lang</button>
        </div>
    );
}
