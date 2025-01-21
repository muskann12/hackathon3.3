"use client"
import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const animateIn = () => {
    const bannerOne = document.getElementById("banner")

    if (bannerOne) {
        const tl = gsap.timeline()
        tl.set([bannerOne], { yPercent: 0 }).to([bannerOne], { yPercent: -100, stagger: 0.2, duration: 1 })
    }
}

export const animateOut = (href: string, router: AppRouterInstance) => {
    const bannerOne = document.getElementById("banner")

    if (bannerOne) {
        const tl = gsap.timeline()
        tl.set([bannerOne], { yPercent: -100 }).to([bannerOne], {
            yPercent: 0, duration: 1, onComplete: () => {
                router.push(href)
            }
        })
    }
}

