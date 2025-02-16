import React from 'react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { Button } from './ui/button'

const NavBar = () => {
    return (
        <div className='w-full flex flex-row justify-between center items-center py-4 border-gray-200 select-none'>
            <Link href='/'>HomeFree</Link>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className='flex flex-row gap-10'>
                        <Link href="/about" legacyBehavior passHref>
                            <NavigationMenuLink>
                                <Button variant={'ghost'}>
                                    About
                                </Button>
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/login" legacyBehavior passHref>
                            <NavigationMenuLink>
                                <Button variant={'ghost'}>
                                    Login
                                </Button>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default NavBar