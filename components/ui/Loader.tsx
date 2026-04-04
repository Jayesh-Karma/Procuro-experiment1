export function ProgressLoader (){
    return(
        <>
        <style>{`
        .loader {
        width: full;
        height: 20px;
        border-radius: 20px;
        background:
        linear-gradient(#ea580c, #ea580c 0 0) 0/0% no-repeat
        lightblue;
        animation: l2 2s infinite steps(10);
        }
        
        @keyframes l2 {
            100% {background-size:110%}
        }
        `}</style>
        <div className="loader">

        </div>
        </>
    )
} 