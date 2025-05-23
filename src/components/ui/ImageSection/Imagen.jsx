const ImageSection = ({ image }) => {
  return (
    <div
      className="w-full md:w-1/2 hidden md:block relative min-h-[500px] rounded-l-lg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 grid place-items-center p-6">
            <p className="absolute top-6 left-0 right-0 text-center font-sans text-primary-color/80 text-[10px] tracking-[0.3em] font-thin">
              FOCUSFRAME
            </p>
            <div className="text-center space-y-3">
              <p className="font-sans text-2xl text-white font-medium">
                Gestión unificada de calendarios y expedientes
              </p>
              <div className="h-px w-16 mx-auto bg-white/30"></div>
            </div>
          </div>
    </div>
  );
};

export default ImageSection;