import React from 'react';

const AppointmentsTable = () => {
  const appointments = [
    {
      date: '01 Jun’20',
      time: '10:00 AM',
      type: 'Consultation',
      doctor: 'Dr. Anatoly Ch.',
      nurse: 'Jessica Monday',
    },
    {
      date: '04 Jun’20',
      time: '11:00 AM',
      type: 'Treatment Procedure',
      doctor: 'Dr. Anatoly Ch.',
      nurse: 'Jessica Monday',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Appointments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          Add appointment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Doctor</th>
              <th className="text-left py-2">Nurse</th>
              <th className="text-left py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2">{`${appt.date} ${appt.time}`}</td>
                <td className="py-2">{appt.type}</td>
                <td className="py-2">{appt.doctor}</td>
                <td className="py-2">{appt.nurse}</td>
                <td className="py-2">
                  <button className="text-blue-600 hover:underline text-sm">Notes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
