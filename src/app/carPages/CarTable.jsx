'use client';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { CaretLeft, CaretRight, DotsThreeVertical, Eye, Plus, MagnifyingGlass, Trash, PencilSimple } from '@phosphor-icons/react';

const PaginationControls = ({ currentPage, totalPages, paginate }) => (
    <div className="flex justify-end items-center p-4 gap-4">
        <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-gray-500"
        >
            <CaretLeft size={18} weight="bold" />
        </button>
        <div className="space-x-2 hidden md:block">
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

    const itemsPerPage = 10;
    const totalPages = 10;

    const currentSet = useMemo(() => {
        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const startPage = Math.floor((currentPage - 1) / 6) * 6 + 1;
        return Array.from({ length: 6 }, (_, i) => startPage + i).filter(
            (page) => page <= totalPages
        );
    }, [currentPage, totalPages]);

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

    // Sample car data
    const cars = [
        {
            type: 'SUV',
            model: 'Toyota Highlander',
            condition: 'New',
            price: '$35,000',
            status: 'Available',
        },
        {
            type: 'Sedan',
            model: 'Honda Accord',
            condition: 'Used',
            price: '$15,000',
            status: 'FULL Reserved',
        },
        {
            type: 'Truck',
            model: 'Ford F-150',
            condition: 'New',
            price: '$45,000',
            status: 'Available',
        },
    ];

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
                                    {cars.map((car, index) => (
                                        <tr key={index} className="border-b text-center">
                                            <td className="px-4 py-3">{car.type}</td>
                                            <td className="px-4 py-3">{car.model}</td>
                                            <td className="px-4 py-3">{car.condition}</td>
                                            <td className="px-4 py-3">{car.price}</td>
                                            <td className={`px-4 py-3 ${car.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                                                {car.status}
                                            </td>
                                            <td className="px-4 py-3 relative ">
                                                <button
                                                    onClick={() => toggleDropdown(index)}
                                                    className="text-gray-500 hover:text-gray-800 focus:outline-none "
                                                >
                                                    <DotsThreeVertical size={24} />
                                                </button>
                                                {selectedCarId === index && (
                                                    <div
                                                        id={`dropdown-${index}`}
                                                        className="absolute  right-20 top-5 z-50 mt-2 py-2 w-32 bg-white rounded-md shadow-xl border border-gray-300"
                                                    >
                                                        <button
                                                            className="  w-full flex px-4 py-2 text-left text-sm hover:bg-gray-100 text-green-800"
                                                            onClick={openPreview}
                                                        >
                                                            <Eye size={20} className="mr-2" />
                                                            <span>View</span>
                                                        </button>
                                                        <button
                                                            className="flex w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-800"
                                                        >
                                                            <Trash size={20} className="mr-2" />
                                                            <span>Ban</span> 
                                                        </button>
                                                        <button
                                                            className="flex w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-blue-800"
                                                        >
                                                            <PencilSimple size={20} className="mr-2" />
                                                            <span>Edit</span>  
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CarTable;
