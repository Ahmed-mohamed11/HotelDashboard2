import { useState, useEffect, useCallback } from 'react';
import { CaretLeft, CaretRight, DotsThree, Eye, NotePencil, TrashSimple, MagnifyingGlass, Plus } from '@phosphor-icons/react';

const PaginationControls = ({ currentPage, totalPages, paginate }) => (
    <div className="flex justify-end items-center p-4 gap-4">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-gray-500"
        >
            <CaretLeft size={18} weight="bold" />
        </button>
        <div className="space-x-2 hidden md:block z-0">
            {Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                const page = Math.floor((currentPage - 1) / 6) * 6 + i + 1;
                return (
                    page <= totalPages && (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`px-4 py-2 text-sm rounded-md ${page === currentPage
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                        >
                            {page}
                        </button>
                    )
                );
            })}
        </div>
        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 text-gray-500"
        >
            <CaretRight size={18} weight="bold" />
        </button>
    </div>
);

const CarTable = ({ openCreate, openPreview }) => {
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState([
        {
            id: 1,
            type: 'SUV',
            model: 'Toyota Highlander',
            condition: 'New',
            price: '$35,000',
            status: 'Available',
        },
        {
            id: 2,
            type: 'Sedan',
            model: 'Honda Accord',
            condition: 'Used',
            price: '$15,000',
            status: 'FULL Reserved',
        },
        {
            id: 3,
            type: 'Truck',
            model: 'Ford F-150',
            condition: 'New',
            price: '$45,000',
            status: 'Available',
        },
    ]);

    const handleClickOutside = useCallback((event) => {
        if (selectedCarId !== null) {
            const dropdown = document.getElementById(`dropdown-${selectedCarId}`);
            if (dropdown && !dropdown.contains(event.target)) {
                setSelectedCarId(null);
            }
        }
    }, [selectedCarId]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]);

    const toggleDropdown = useCallback((carId) => {
        setSelectedCarId((prevCarId) => (prevCarId === carId ? null : carId));
    }, []);

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    // تغيير حالة السيارة
    const changeStatus = (carId, newStatus) => {
        setCars((prevCars) =>
            prevCars.map((car) =>
                car.id === carId ? { ...car, status: newStatus } : car
            )
        );
        setSelectedCarId(null); // غلق القائمة المنسدلة بعد التحديث
    };

    return (
        <div className="font-sans">
            <section className="p-0 my-4 sm:p-5">
                <div className="mx-auto max-w-screen-xl">
                    <div className="bg-white relative shadow-md rounded-lg dark:text-white dark:bg-gray-dark">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2 hidden md:block">
                                <h4 className="fw-bold font-sans">All Cars</h4>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <form className="flex items-center justify-between w-full md:w-auto">
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MagnifyingGlass
                                                size={20}
                                                weight="bold"
                                                className="mx-1 text-gray-500"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="flex items-center align-middle text-gray-900 text-sm rounded-lg w-full pl-10 py-1 bg-green-100 outline-none border border-gray-500"
                                            placeholder="Search"
                                            required
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </form>
                                <button
                                    onClick={openCreate}
                                    type="button"
                                    className="flex gap-2 w-full md:w-auto fw-bold font-sans items-center justify-center duration-150 ease-linear text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 bg-green-700"
                                >
                                    <Plus size={18} weight="bold" />
                                    Add Car
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-md text-gray-700 uppercase text-center">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">
                                            Car Type
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Car Model
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Car Condition
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map((car) => (
                                        <tr key={car.id} className="border-b text-center">
                                            <td className="px-4 py-3">{car.type}</td>
                                            <td className="px-4 py-3">{car.model}</td>
                                            <td className="px-4 py-3">{car.condition}</td>
                                            <td className="px-4 py-3">{car.price}</td>
                                            <td className={`px-4 py-3 ${car.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                                                {car.status}
                                            </td>
                                            <td className="px-4 py-3 flex items-center justify-end relative">
                                                <button
                                                    className="inline-flex items-center text-sm font-medium hover:bg-gray-100 p-1.5 text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                                                    type="button"
                                                    onClick={() => toggleDropdown(car.id)}
                                                >
                                                    <DotsThree size={25} weight="bold" />
                                                </button>
                                                {selectedCarId === car.id && (
                                                    <div
                                                        id={`dropdown-${car.id}`}
                                                        className="absolute  z-auto  w-44 bg-white rounded divide-y divide-gray-100 shadow top-0 right-0 dark:bg-gray-700 dark:divide-gray-600"
                                                    >
                                                        <ul className="py-1 text-sm">
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openPreview(car)}
                                                                    className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600  text-gray-700 dark:text-gray-200"
                                                                >
                                                                    <Eye size={18} weight="bold" />
                                                                    Preview
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => changeStatus(car.id, car.status === 'Available' ? 'FULL Reserved' : 'Available')}
                                                                    className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600  text-gray-700 dark:text-gray-200"
                                                                >
                                                                    <NotePencil size={18} weight="bold" />
                                                                    Change Status
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    className="flex gap-2 w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600  text-gray-700 dark:text-gray-200"
                                                                >
                                                                    <TrashSimple size={18} weight="bold" />
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={Math.ceil(cars.length / 10)}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CarTable;
