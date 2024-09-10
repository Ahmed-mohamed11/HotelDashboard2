'use client';
import { useState, useCallback } from "react";
import {   X } from "@phosphor-icons/react";
 import FormText from "../../form/FormText";
import FormNumber from "../../form/FormNumber";
import FormEmail from "../../form/FormEmail";
import FormSelect from "../../form/FormSelect";
import FormInput from "../../form/FormInput";
import {  Button, Input, Label } from "reactstrap";

const PreviewHotel = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        customerName: "name",
        roomNumber: "50",
        customerID: "1",
        roomType: "observed",
        country: "Egypt",
        mobileNumber: "01032210349",
        email: "info@gmail.com",
        hotelName: "kiloPatra",
        checkIn: "17/4/2002",
        checkOut: "18/4/2002",
        facilities: [] // Ensure this is always an array
    });

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
        >
            <div
                className="CreateBooking font-sans fw-bold w-full bg-white rounded-lg shadow-lg fixed top-0 right-0 h-full transition-transform duration-300 ease-in-out"
                style={{ width: '40vw', zIndex: 50 }}
            >
                <div className="relative text-gray-900">
                    <div className="bg-green-700 w-full flex justify-between items-center text-white p-3 mb-4 rounded-t-lg border-b">
                        <h3 className="text-lg font-semibold">Request Details</h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5 inline-flex items-center"
                            aria-label="Close modal"
                        >
                            <X size={18} weight="bold" />
                        </button>
                    </div>
                    <form>
                        <div className="gap-4 mb-4 px-4">
                            <div className="flex justify-between items-center gap-3">
                                <div className="w-1/2">
                                    <FormText
                                        label="Customer Name"
                                        name="customerName"
                                        value={formData.customerName}
                                        placeholder="Enter Customer Name"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormText
                                        label="Room Type"
                                        name="roomType"
                                        value={formData.roomType}
                                        placeholder="Enter Room Type"
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-3 mt-3">
                                <div className="w-1/2">
                                    <FormText
                                        label="Country"
                                        name="country"
                                        value={formData.country}
                                        placeholder="Enter Country"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormNumber
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        placeholder="+966 0123456789"
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-3 mt-3">
                                <div className="w-1/2">
                                    <FormEmail
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Enter Email Address"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormSelect
                                        selectLabel="Hotel Name"
                                        name="hotelName"
                                        value={formData.hotelName}
                                        options={[
                                            { value: "hotel1", label: "Hotel 1" },
                                            { value: "hotel2", label: "Hotel 2" },
                                            { value: "hotel3", label: "Hotel 3" },
                                        ]}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-3 mt-3">
                                <div className="w-1/2">
                                    <FormInput
                                        label="Check In"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        required
                                        type="date"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormInput
                                        label="Check Out"
                                        name="checkOut"
                                        type="date"
                                        value={formData.checkOut}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-3 my-3">
                                <div className="w-1/2">
                                    <FormText
                                        label="Customer ID"
                                        name="customerID"
                                        value={formData.customerID}
                                        placeholder="Enter Customer ID"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormNumber
                                        label="Room Number"
                                        name="roomNumber"
                                        value={formData.roomNumber}
                                        placeholder="123456789"
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-3 mt-3">
                                <div className="w-1/2">
                                    <Label>Features</Label>
                                    <div className="flex space-x-2 my-3">
                                        {["AC", "GPS", "Bluetooth", "Wifi"].map((facility) => (
                                            <div key={facility} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={facility.toLowerCase()}
                                                    name="facilities"
                                                    value={facility.toLowerCase()}
                                                    checked={formData.facilities?.includes(facility.toLowerCase()) || false}
                                                    readOnly
                                                    className="form-checkbox h-4 w-4 text-green-600"
                                                />
                                                <Label htmlFor={facility.toLowerCase()} className="ml-2 text-gray-700">
                                                    {facility}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                  <div className="flex flex-col">
                                    <Label htmlFor="adults" className="text-center">Adults</Label>
                                    <div className="w-1/2">
                                        <div className="flex items-center  bg-gray-50">
                                            <Button outline>-</Button>
                                            <Input id="adults" value="2" className="text-center bg-gray-50" readOnly />
                                            <Button outline>+</Button>
                                        </div>
                                    </div>
                                  </div>
                            </div>
                            <div className="flex justify-center gap-2 mt-5">
                                <button
                                    type="button"
                                    className="px-8 py-2 bg-green-700 text-white rounded-lg shadow-md"
                                    disabled
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-8 py-2 w-fit bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PreviewHotel;
