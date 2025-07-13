import { ActionList } from "@app/components/common/actions-list/ActionList";
import { Container } from "@app/components/common/container/Container";
import type { CustomAction, ImageField } from "@libs/types";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

export const Hero: FC<{
  title?: string;
  content?: ReactNode;
  actions?: CustomAction[];
  image?: ImageField;
  video?: string;
  className?: string;
  backgroundClassName?: string;
  actionsClassName?: string;
}> = ({
  title,
  content,
  actions,
  image,
  video,
  className,
  backgroundClassName,
  actionsClassName,
}) => {
  return (
    <>
      {image?.url && <link rel='preload' href={image.url} as='image' />}
      {video && <link rel='preload' href={video} as='video' type='video/mp4' />}
      <Container
        className={clsx(
          "flex flex-col justify-center items-center relative w-full min-h-[400px] sm:min-h-[600px] md:min-h-[800px] overflow-hidden",
          className
        )}
      >
        <div className='absolute inset-0 w-full h-full z-0'>
          {video ? (
            <video
              className='object-cover w-full h-full'
              src={video}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : image?.url ? (
            <img
              src={image.url}
              alt={image.alt || "Hero Banner"}
              className='object-cover w-full h-full'
            />
          ) : null}
          <div
            className={clsx("absolute inset-0 bg-white/20", backgroundClassName)}
          />
        </div>
        <div className='relative z-10 w-full text-white flex flex-col items-center justify-center py-16'>
          <div className='inline-grid gap-6 w-full max-w-3xl mx-auto'>
            {title && (
              <div className='break-words text-4xl md:text-6xl font-bold'>
                {title}
              </div>
            )}
            {typeof content === "string" ? (
              <div className='text-lg w-full'>{content}</div>
            ) : (
              content
            )}
          </div>
          {!!actions?.length && (
            <ActionList
              actions={actions}
              className={clsx("mt-8 lg:mt-10 flex-col", actionsClassName)}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Hero;
