import { Target, Plus, TrendingUp, PiggyBank } from 'lucide-react';

export default function NoSavingsFound() {
  const handleCreateGoal = () => {
    console.log('Create new savings goal');
    // Open modal or navigate to create page
  };

  return (
    <div className="min-h-screen w-full bg-secondary flex items-center justify-center p-4">
      <div className="w-full">
        {/* Main Empty State Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          {/* Animated Icon */}
          <div className="relative mb-8 flex justify-center">
            {/* Background glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-primary opacity-5 rounded-full blur-3xl"></div>
            </div>
            
            {/* Icon container */}
            <div className="relative bg-gray-800 p-8 rounded-full border-4 border-gray-700">
              <PiggyBank className="w-20 h-20 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            No Savings Goals Yet
          </h2>
          
          {/* Description */}
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Start building your financial future by creating your first savings goal. 
            Set targets, track progress, and achieve your dreams!
          </p>

          {/* Create Goal Button */}
          <button
            onClick={handleCreateGoal}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:opacity-90 text-secondary font-bold rounded-xl  shadow-xl hover:shadow-2xl text-lg"
          >
            Create Your First Goal
          </button>
          
        </div>
      </div>
    </div>
  );
}