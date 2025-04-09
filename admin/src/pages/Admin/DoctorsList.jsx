import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import EditDoctorModal from './EditDoctorModal'; // Adjust path if needed

const DoctorsList = () => {
  const {
    doctors,
    changeAvailability,
    aToken,
    getAllDoctors,
    deleteDoctor,
    editDoctor,
  } = useContext(AdminContext);

  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden group relative'
            key={index}
          >
            <img
              className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500 w-full h-36 object-cover'
              src={item.image}
              alt=""
            />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 text-xs border border-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDoctor(item._id)}
                  className="text-red-600 text-xs border border-red-600 px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDoctor && (
        <EditDoctorModal
          doctor={editingDoctor}
          onClose={() => setEditingDoctor(null)}
          onSave={async (updatedInfo) => {
            const res = await editDoctor(editingDoctor._id, updatedInfo);
            if (res?.success) {
              setEditingDoctor(null);
            }
          }}
          
        />
      )}
    </div>
  );
};

export default DoctorsList;
