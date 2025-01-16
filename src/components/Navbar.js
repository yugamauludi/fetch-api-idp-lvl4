import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
export default function Navbar() {

    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem("isLogin", false);
        navigate('/');
    }
    
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Logging out will end your session. You'll need to log in again to regain access.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
      };
    return (
        <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/pegawai" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://lh6.googleusercontent.com/proxy/EEyh3_FQSdOgfArHo8CE1nORtqcPh22CX2-7Kv9eSEKaau5Hd6s_Eqez_BA4J7w7AKoG_7g2IE1wjRswjxsvP3INbD_9V743_nFHfjytTGQlmJINGvY2iCJnzdvGh8R2SZQ" class="h-8" alt="Semag Logo"/>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SIMPEG</span>
                </a>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={() => handleLogout()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                    <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/pegawai" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pegawai</Link>
                        </li>
                        <li>
                            <Link to="/pelatihan" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pelatihan</Link>
                        </li>
                        <li>
                            <Link to="/kelas" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Kelas</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
 
    )
}