export default function Footer() {
  return (
    <footer className="m-5 border-t border-gray-300 py-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} Quiz App. All rights reserved.
    </footer>
  );
}