//
function Page() {
  return (
  <div className="flex flex-row bg-blue-200">
    <div className="flex-1 text-end pt-0.5 px-2">
      <span className="text-xl text-blue-700">Loading...</span>
    </div>
    <div className="flex-1 text-center pt-1.5 pb-1">
      <div className="flex" aria-label="Loading now...">
        <div className="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    </div>
  </div>
  );
}
export default Page;
/*
  <div className="flex flex-row">
    <div className="flex-1 text-end pt-0 px-2">
      <span className="text-xl">Loading...</span>
    </div>
    <div className="flex-1 text-center pt-1.5" aria-label="Loading now...">
      <div className="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent">
      </div>
    </div>
  </div>
*/