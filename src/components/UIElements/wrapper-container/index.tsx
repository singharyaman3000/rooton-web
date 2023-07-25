const Container = ({children}:{children: React.ReactNode}) => {
    return <div className="flex min-h-screen max-w-[1440px] mx-auto px-6 md:px-20">{children}</div>;
}

export default Container