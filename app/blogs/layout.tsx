export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full prose prose-invert">{children}</div>;
}
