import { faFacebookMessenger, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function ModelInfo({ data: { image, name, size = null }, className }) {
  ///// TODO MAKE NEW COMPONENT FOR MOB A
  const [width, height, depth] = size ? size.split(',') : []
  // console.log(width, height, depth);
  return (
    <div
      className={`py-0 sm:py-6 md:py-8 lg:flex lg:py-10 xl:px-8 xl:py-8 2xl:px-8 w-full 2xl:w-11/12 h-full overflow-scroll no-scrollbar lg:overflow-hidden ${+className}`}
    >
      <div className="basis-7/12 flex w-full justify-center items-center lg:shadow-md rounded lg:max-h-120 xl:max-h-144 2xl:max-h-full">
        <img
          src={image}
          alt={name}
          className="object:cover w-full max-h-full md:rounded md:rounded-b-none lg:rounded-tr-none lg:rounded-l "
        />
      </div>
      <div className="gap-2 md:gap-4 sm:rounded-b lg:rounded-bl-none lg:rounded-r flex flex-col basis-5/12 flex-grow lg:shadow-lgb">
        <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-6 2xl:gap-8 rounded">
          <div className="flex px-4 gap-5 sm:gap-8 2xl:gap-4 ">
            <a href="/facebook">
              <FontAwesomeIcon icon={faFacebookMessenger} color="#006AFF" className="w-6 sm:w-8 lg:w-6 h-auto" />
            </a>
            <a href="/whatsapp">
              <FontAwesomeIcon icon={faWhatsapp} color="green" className="w-6 sm:w-8 lg:w-6 h-auto" />
            </a>
          </div>

          <div className="items-center text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center">
            {name}
          </div>
        </div>

        <div className="gap-2 sm:gap-4 items-center flex text-xl sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-bold justify-center">
          {width || ''}
          {height && '  x  '}
          {height || ''}
          {depth && '  x  '}
          {depth || ''}
        </div>
        <div className="overflow-y-scroll no-scrollbar bg-white border-t-2 w-full grow h-52 lg:h-full rounded relative ">
          <div className="top-4 left-4 absolute">Comments:</div>
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 -rotate-45 text-4xl w-full text-center">
            COMING SOON
          </div>
        </div>
      </div>
    </div>
  )
}
