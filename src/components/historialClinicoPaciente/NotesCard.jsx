import React from 'react';

const NotesCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notes</h2>
        <button className="text-blue-500 text-sm">See all</button>
      </div>
      <div className="text-sm text-gray-700 space-y-2">
        <p>– The patient needs to get full amount of tests</p>
        <p>– Change treatment plan as update</p>
        <p>– Take information from x-ray picture</p>
        <p>– Change medicine for pain</p>
      </div>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded-md text-sm"
          placeholder="Add a new note..."
          rows={2}
        />
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700">
          Save note
        </button>
      </div>
    </div>
  );
};

export default NotesCard;
