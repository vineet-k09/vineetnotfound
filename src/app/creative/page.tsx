'use client'
import TextPressure from "./scripts/TextPressure"

export default function Creative() {
    return (
        <>
            <h2>The challenge starts here</h2>
            <div style={{ position: 'relative', height: '300px' }}>
                <TextPressure
                    text="Vineet"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="var(--accent)"
                    strokeColor="#ff0000"
                    minFontSize={36}
                />
            </div></>
    )
}