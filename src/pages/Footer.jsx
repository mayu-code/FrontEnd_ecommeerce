import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
                <div>
                    <Link
                        to="/admin/login" // You can modify the path to match your Admin Login route
                        className=" hover:text-blue-600 text-white py-2 px-4 rounded"
                    >
                        Admin Login
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
