// apparently function name doesn't quite matter for page component? :/
// 'use client';
export default function YouCantSeeMe() {
  console.log("you can't see me page loaded");
  // this is a server component -> not gonna see log on browser, but in terminal
  // if using 'use client', logs can be seen from both client and server
  return (
    <div>
      <h1>You can&apos;t see me 👀</h1>
    </div>
  );
}
