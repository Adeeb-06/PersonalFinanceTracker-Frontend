"use client"
import { Calendar, DollarSign, Target, X } from 'lucide-react';
import React, { useState } from 'react'

const SavingsAddModal = ({setIsModalOpen}: {setIsModalOpen: (value: boolean) => void}) => {
  const [formData, setFormData] = useState({
    title: '',
    currentAmount: '',
    targetAmount: '',
    deadline: ''
  });
      const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Savings goal created:', formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      title: '',
      currentAmount: '',
      targetAmount: '',
      deadline: ''
    });
  };
  return (
       <div className="fixed inset-0  bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-secondary border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Savings Goal</h2>
                  <p className="text-sm text-gray-400 mt-1">Set a new financial target</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Goal Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Emergency Fund"
                    className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                  />
                </div>

                {/* Current Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Current Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      name="currentAmount"
                      type="number"
                      step="0.01"
                      value={formData.currentAmount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Target Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Target Amount
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      name="targetAmount"
                      type="number"
                      step="0.01"
                      value={formData.targetAmount}
                      onChange={handleChange}
                      placeholder="10000.00"
                      className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Deadline
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.targetAmount || !formData.deadline}
                  className="px-6 py-3 bg-primary hover:opacity-90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
  )
}

export default SavingsAddModal