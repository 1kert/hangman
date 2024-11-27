interface charButtonProps {
    character: string,
    isActive: boolean,
    isPressable: boolean,
    onGuess: () => void
}

function CharButton(props: charButtonProps) {
    const char = props.character

    return (
        <div onClick={() => {if(props.isActive && props.isPressable) props.onGuess()}} className={`select-none size-16 ${props.isActive ? "bg-green-700" : "bg-green-900"} text-white font-bold rounded-2xl flex justify-center items-center`}>
            <span className="text-2xl">{char.toUpperCase()}</span>
        </div>
    )
}

export default CharButton
