export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#305a30]  to-[#137a2d]">
        <div className="flex items-center justify-center py-8 font-mincho w-full space-x-96">
            <p className="font-bold text-green-200">© {new Date().getFullYear()} Sigmabond. All rights reserved.</p>
            <div className="flex items-end justify-end space-x-12 font-semibold text-green-400">
                <p className="hover:text-green-950 transition duration-300"><a href="https://x.com/Sigmabond01">X (Twitter)</a></p>
                <p className="hover:text-green-950 transition duration-300"><a href="https://github.com/Sigmabond01">Github</a></p>
                <p className="hover:text-green-950 transition duration-300"><a href="/">Home</a></p>
            </div>
        </div>
        </footer>
    );
}