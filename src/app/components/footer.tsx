import { useLangContext } from "@/hooks/useLang"
export default function Footer() {
    const {visibleText} = useLangContext()
    return (
        <>
            <footer className='flex justify-center'>
                <span>{visibleText.footer}</span>
            </footer>
        </>
    )
}