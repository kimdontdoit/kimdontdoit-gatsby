export const Logo = () => {
  return (
    <Link to="/">
      <StaticImage
        src="../../images/kimdontdoit_logo_2023.svg"
        alt="Kimdontdoit Wavy Logo"
        objectFit="contain"
        loading="eager"
        placeholder="none"
        layout="fixed"
        className={`${classes.logo}`}
        height={32}
        /** Add  */
      />
    </Link>
  );
};
