import "../App.css"

const Top = () => {
    return (
        <div className="text-white flex flex-col justify-center items-center mt:20 h-170 md:mt-40 md:h-210 anim" id="home">
            <h2 className="text-4xl capitalize mb-4">Hi, I am Asked</h2>
            <p className="text-md md:text-xl text-justify m-3 md:m-0">DEV/GAMER</p>
            <a href="#socials"><button class=" btn mt-3 bg-indigo-500 p-3 rounded-[0.4vw] hover:-translate-y-[2px] active:translate-y-[1px] active:opacity-80">Kapcsolat</button></a>
        </div>
    )
}

export default Top;