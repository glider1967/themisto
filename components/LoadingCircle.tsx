const LoadingCircle = () => {
  return (
    <div className="flex justify-center items-center gap-6 mt-10">
      <div className="h-8 w-8 animate-spin border-[5px] border-blue-500 rounded-full border-t-transparent">
        {" "}
      </div>
      <p className="text-lg font-weight">Loading...</p>
    </div>
  );
};

export default LoadingCircle;
