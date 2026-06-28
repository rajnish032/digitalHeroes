const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Golf ball loader */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-2 border-t-emerald-500 animate-spin" />
          {/* dimples */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>
        <p className="text-xs font-medium text-gray-400 tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
};

export default PageLoader;