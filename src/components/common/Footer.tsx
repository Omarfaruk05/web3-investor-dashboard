export default function Footer() {
    return (
        <footer className="border-t border-gray-700 h-[57px] flex items-center justify-center text-sm bg-gray-900">
            © {new Date().getFullYear()} E-Estate — All rights reserved.
        </footer>
    );
}
