import { headerText } from "../../lib/FlavorText";


export default function MainSection() {

    return (
        <div className="h-dvh flex flex-col justify-start items-center text-center">
            <div className="h-full flex items-center justify-center w-full bg-amber-500">
                {headerText}
            </div>
            <div className="mt-12 text-4xl">
                How it works:
            </div>
        </div>
    )
}

