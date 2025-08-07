export function Footer() {
    return (
        <footer>
        <div className="flex items-center justify-center py-8 font-mincho w-full space-x-96">
            <p className="font-bold text-blue-200">© {new Date().getFullYear()} Sigmabond. All rights reserved.</p>
            <div className="flex items-end justify-end space-x-12 font-semibold text-blue-400">
                <p className="hover:text-blue-700 transition duration-300"><a href="https://x.com/Sigmabond01">X (Twitter)</a></p>
                <p className="hover:text-blue-700 transition duration-300"><a href="https://github.com/Sigmabond01">Github</a></p>
                <p className="hover:text-blue-700 transition duration-300"><a href="/">Home</a></p>
            </div>
        </div>
        </footer>
    );
}