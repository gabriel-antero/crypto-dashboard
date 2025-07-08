export default function SkeletonCard() {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 w-full animate-pulse">
            <div className="w-12 h-12 bg-gray-700 rounded-full self-start"></div>

            <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-700 rounded w-1/2"></div>

                <div className="flex items-center space-x-4">
                    <div className="h-3 bg-gray-700 rounded w-1/6"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/5"></div>
                </div>

                <div className="h-5 bg-gray-700 rounded w-2/5 mt-2"></div>
            </div>
        </div>
    );
}