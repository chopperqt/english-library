interface SkeletonProps {
  height: number;
  width?: number;
}
const Skeleton = ({ height, width }: SkeletonProps) => {
  let styles:{[key: string]: string} = {
    height: `${height}px`
  }

  if (width) {
    styles = {
      ...styles,
      width: `${width}px`,
    }
  }

  const className = `flex w-full bg-neutral-300 rounded-[8px]`;

  return <div className={className} style={styles} />;
};

export default Skeleton;
