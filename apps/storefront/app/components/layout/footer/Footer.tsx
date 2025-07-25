import { LogoStoreName } from "@app/components/LogoStoreName/LogoStoreName";
import { Container } from "@app/components/common/container/Container";
import { Select } from "@app/components/common/forms/inputs/Select";
import { URLAwareNavLink } from "@app/components/common/link/URLAwareNavLink";
import { NewsletterSubscription } from "@app/components/newsletter/Newsletter";
import { useRegion } from "@app/hooks/useRegion";
import { useRegions } from "@app/hooks/useRegions";
import { useRootLoaderData } from "@app/hooks/useRootLoaderData";
import { useSiteDetails } from "@app/hooks/useSiteDetails";
import { convertToFormData } from "@libs/util/forms/objectToFormData";
import clsx from "clsx";
import { useMemo } from "react";
import { useFetcher } from "react-router";
import { StripeSecurityImage } from "../../images/StripeSecurityImage";
import { SocialIcons } from "./SocialIcons";

export const Footer = () => {
  const { footerNavigationItems, settings } = useSiteDetails();
  const rootData = useRootLoaderData();
  const hasProducts = rootData?.hasPublishedProducts;
  const fetcher = useFetcher();
  const { regions } = useRegions();
  const { region } = useRegion();

  const regionOptions = useMemo(() => {
    return regions.map((region) => ({
      label: `${region.name} (${region.currency_code})`,
      value: region.id,
    }));
  }, [regions]);

  const onRegionChange = (regionId: string) => {
    fetcher.submit(
      convertToFormData({
        regionId,
      }),
      { method: "post", action: "/api/region" }
    );
  };

  return (
    <footer className='bg-primary-500 min-h-[140px] py-8 text-white'>
      <Container>
        <div className='grid sm:grid-cols-2 lg:grid-cols-6 w-full flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-16'>
          <div className='flex w-full flex-col items-center gap-8 sm:w-auto sm:items-start sm:gap-9 sm:col-span-2 lg:col-span-3'>
            <div className='flex flex-col gap-5'>
              <h4 className='font-bold'>About Tammy</h4>
              <p className='text-sm'>
                Tammy Ann is an artist and designer born and based in San
                Francisco. She delights in creating whimsical pieces that tell
                stories. She spent her childhood learning to calligraph, draw,
                and read from her grandfather in the cloud forests of Canton,
                China, before returning to her beloved city.
              </p>
            </div>
            <LogoStoreName />
          </div>

          <nav
            className={clsx("pt-2", {
              "columns-2 gap-16":
                footerNavigationItems && footerNavigationItems?.length > 5,
            })}
          >
            <h5 className='font-bold mb-4'>Collections</h5>
            {footerNavigationItems?.map(({ id, new_tab, ...navItemProps }) => (
              <URLAwareNavLink
                key={id}
                {...navItemProps}
                newTab={new_tab}
                className='hover:text-slate-200 block pb-2 text-sm'
                prefetch='viewport'
              >
                {navItemProps.label}
              </URLAwareNavLink>
            ))}
          </nav>
          <div className='flex flex-col gap-5 lg:col-span-2'>
            <NewsletterSubscription className='mb-4' />

            <SocialIcons siteSettings={settings} />

            {/* <div className='flex flex-col gap-4 mt-4'>
              <h5>Location</h5>
              <p className='text-sm'>
                1619 E Cesar Chavez St, Austin, TX 78702
                <br />
                Open 7AM - 4PM Daily
              </p>
            </div> */}
          </div>
        </div>
        <div className='flex flex-col max-md:items-center gap-8 mt-8 md:flex-row md:justify-between'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-2 '>
              <Select
                className='!text-base border-1 border-white text-white bg-transparent !shadow-none'
                options={regionOptions}
                defaultValue={region?.id}
                onChange={(e) => {
                  onRegionChange(e.target.value);
                }}
              />
            </div>

            <a
              href='https://www.lambdacurry.dev/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col items-start gap-1 text-sm'
            >
              © {new Date().getFullYear()} Tammy Ann Tan
            </a>
          </div>
          <div className='mt-1 flex flex-col justify-end text-xs sm:mt-0'>
            {hasProducts && <StripeSecurityImage className='mt-2' />}
          </div>
        </div>
      </Container>
    </footer>
  );
};
