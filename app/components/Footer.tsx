import ThemedGradient from "./ThemedGradient";

const Footer = () => {
  return (
    <footer className="mt-12 text-center text-sm">
      <hr className="my-3 border-gray-400 opacity-20 sm:mx-auto lg:my-6" />
      <span className="block pb-4">
        <ThemedGradient>
          © 2025{" "}
        </ThemedGradient>
        <a
          href="https://flowbite.com/"
          className="bg-gradient-to-r from-white via-[#3B1C9C] to-[#5A3DD7] bg-clip-text text-transparent hover:underline"
        >
          JN™
        </a>
        <ThemedGradient>
          . All Rights Reserved.
        </ThemedGradient>
      </span>
    </footer>
  );
};

export default Footer;
