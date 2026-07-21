// Allow TypeScript to accept CSS side-effect imports (e.g. import './globals.css')
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
