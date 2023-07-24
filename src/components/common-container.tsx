const Container = ({children}:{children: React.ReactNode}) => {
    return <div className="flex min-h-screen px-6 md:px-20">{children}</div>;
}

export default Container