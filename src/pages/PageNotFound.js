import React from "react";
import Button, { Button_Variants } from "../components/atoms/button/index";
import { ROUTE_VALUES } from "../helpers/helper.constants";
import { useRouting } from "../helpers/routing.helper";

export default function PageNotFound() {
  const { goToRoute } = useRouting();
  return (
    <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Button click={() => goToRoute(ROUTE_VALUES.LOGIN)} variant={Button_Variants.SUBMIT} additionalClass="px-4 py-2">
                    Go to login
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
