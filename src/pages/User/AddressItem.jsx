import React from "react";

const AddressSection = ({ index, address }) => {
    return (
        <div className="border-b py-4 flex flex-row justify-between">
            <div className='flex justify-between'>

                <div className="mt-2 flex flex-row gap-1">
                    <div>

                        <p>{index + 1}.</p>
                    </div>
                    <div className="flex gap-2">
                        <h4 className='capitalize font-semibold'>{address.city}</h4>
                        <p className='capitalize'>{address.state}</p>
                        <p className='capitalize'>{address.country}</p>
                        <p className='capitalize'>-{address.pinCode}</p>
                    </div>
                </div>
            </div>
            <div>
                <button className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default AddressSection;
