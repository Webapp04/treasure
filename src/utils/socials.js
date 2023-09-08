import twitterImg from "../assets/images/marketplace/twitter.svg";
import twitterImgDark from "../assets/images/marketplace/twitter_dark.svg";
import instaImgDark from "../assets/images/marketplace/instaDark.svg";
import instaImg from "../assets/images/marketplace/insta.svg";
import discordImg from "../assets/images/marketplace/discord.svg";
import discordImgDark from "../assets/images/marketplace/discord_dark.svg";
import socials1Img from "../assets/images/marketplace/socials2.svg";
import socials1ImgDark from "../assets/images/marketplace/globus_dark.svg";
import telegramImg from '../assets/images/marketplace/telegram.svg'
import telegramImgDark from '../assets/images/marketplace/telegram_dark.svg'
import facebookImg from '../assets/images/marketplace/facebook.svg'
import facebookImgDark from '../assets/images/marketplace/facebookDark.svg'

export const NAVBAR_SOCIALS = [
    {link: 'instagram'},
    {link: 'twitter'},
    {link: 'discord'},
    {link: 'telegram'},
    {link: 'facebook'},
]

export const setSocialImage = (link, isDark) => {
    if (link?.includes('instagram')) return isDark ? instaImgDark : instaImg
    if (link?.includes('twitter')) return isDark ? twitterImgDark : twitterImg
    if (link?.includes('discord')) return isDark ? discordImgDark : discordImg
    if (link?.includes('telegram')) return isDark ? telegramImgDark : telegramImg
    if (link?.includes('facebook')) return isDark ? facebookImgDark : facebookImg

    return isDark ? socials1ImgDark : socials1Img
}

export const setSocialImageWidth = (link) => {
    if (link?.includes('instagram')) return 17
    if (link?.includes('twitter')) return 18
    if (link?.includes('discord')) return 20
    if (link?.includes('telegram')) return 17
    if (link?.includes('facebook')) return 17

    return 17
}

export const setSocialImageHeight = (link) => {
    if (link?.includes('instagram')) return 17
    if (link?.includes('twitter')) return 15
    if (link?.includes('discord')) return 15
    if (link?.includes('telegram')) return 17
    if (link?.includes('facebook')) return 17

    return 17
}
