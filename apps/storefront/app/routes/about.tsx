import { Container } from "@app/components/common/container";
import Hero from "@app/components/sections/Hero";
import { getMergedPageMeta } from "@libs/util/page";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

const locations: LocationProps[] = [
  {
    title: "Barrio South Lamar",
    addressLines: ["1105 S. Lamar Blvd", "Austin, TX 78704"],
    phone: "(512) 906-0010",
    hours: ["Open Daily — 7am to 7pm"],
    imageUrl: "/assets/images/location-1.png",
  },
  {
    title: "Barrio Sonterra",
    addressLines: [
      "700 E. Sonterra Blvd. Suite #1113",
      "San Antonio, TX 78258",
    ],
    phone: "(210) 530-8740",
    hours: [
      "Mon thru Fri — 6am to 7pm",
      "Sat — 7am to 7pm",
      "Sun — 7am to 6pm",
    ],
    imageUrl: "/assets/images/location-2.png",
  },
  {
    title: "Barrio Deep Ellum",
    addressLines: ["2369 Main Street", "Dallas, TX 75226"],
    phone: "(469) 248-3440",
    hours: ["Sun thru Thu — 7am to 7pm", "Fri thru Sat — 7am to 8pm"],
    imageUrl: "/assets/images/location-3.png",
  },
];

export const loader = async (args: LoaderFunctionArgs) => {
  return {};
};

export const meta: MetaFunction<typeof loader> = getMergedPageMeta;

type LocationProps = {
  title: string;
  hours: string[];
  phone: string;
  addressLines: string[];
  imageUrl: string;
};

const Location = ({
  title,
  addressLines,
  phone,
  hours,
  imageUrl,
}: LocationProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 text-xl'>
      <div className='w-full h-full flex items-center justify-center col-span-2'>
        <div
          className='bg-cover bg-no-repeat bg-center w-full rounded-3xl h-72'
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      </div>

      <div className='flex flex-col gap-4 col-span-1 md:justify-center'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <div>
          {addressLines.map((line) => (
            <p>{line}</p>
          ))}
          <p>p. {phone}</p>
        </div>
        <div>
          <h4 className='font-bold'>Hours</h4>
          {hours.map((hour) => (
            <p>{hour}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function IndexRoute() {
  return (
    <>
      <Container className='!px-0 py-0 sm:!p-16'>
        <Hero
          className='min-h-[400px] !max-w-full bg-accent-50 sm:rounded-3xl p-6 sm:p-10 md:p-[88px] md:px-[88px]'
          content={
            <div className=' w-full space-y-9'>
              {/* img */}

              <img
                src='/assets/images/Tammy_Tan.webp'
                alt='Tammy Ann Tan'
                className='w-48 h-48 md:w-64 md:h-64 full object-cover'
              />

              <h4 className='text-lg md:text-2xl font-italiana tracking-wider text-primary-900'>
                Bio
              </h4>
              {/* <h1 className='text-4xl md:text-8xl font-italiana tracking-wider [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)] text-primary-900'>
                About Tammy
              </h1> */}
              <p className='mx-auto text-md md:text-md !leading-normal text-primary-900'>
                Tammy Ann is an artist and designer born and based in San
                Francisco. She delights in creating whimsical pieces that tell
                stories. She spent her childhood learning to calligraph, draw,
                and read from her grandfather in the cloud forests of Canton,
                China, before returning to her beloved city. She studied at
                Rhode Island School of Design. She takes on a range of projects
                from illustration, children's lifestyle, to luxury goods.
              </p>
            </div>
          }
          actionsClassName='!flex-row w-full justify-center !font-base'
          actions={
            [
              // {
              //   label: "Shop Our Coffee",
              //   url: "/products",
              // },
              // {
              //   label: "Join the Barrio Community",
              //   url: "#",
              // },
            ]
          }
        />
      </Container>

      {/* <Container className="pt-4 flex flex-col gap-16 py-0 sm:!px-16 pb-44">
        <div className="font-italiana text-4xl break-words md:text-6xl lg:text-7xl">
          Find your people, find your <span className="font-ballet text-[150%] leading-tight">Barrio</span>
        </div>
        {locations.map((location) => (
          <Location {...location} />
        ))}
      </Container> */}
    </>
  );
}
