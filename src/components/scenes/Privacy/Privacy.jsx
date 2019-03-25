import React, { useEffect } from 'react';

import Construction from '../../common/Construction';

import { PRIVACY_SUBTITLE, PRIVACY_TITLE } from '../../../constants';

import './_privacy.scss';

const Privacy = ({ reset, setTitle }) => {
	const title = PRIVACY_TITLE;

	useEffect(() => {
		if (setTitle) {
			setTitle(title);
		}
		return () => {
			if (reset) {
				reset();
			}
		};
	}, [title]);

	return (
		<div className="page privacy">
			<Construction
				className="privacy__under-construction"
				subtitle={PRIVACY_SUBTITLE}
				title={PRIVACY_TITLE}
			>
				<span className="privacy__title">Introduction</span>
				<p className="privacy__text">
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit{' '}
					<a
						className="privacy__text-link"
						href="https://ethereum-explorer.appspot.com/app/portfolio"
						rel="noopener noreferrer"
						target="_blank"
					>
            https://ethereum-explorer.appspot.com
					</a>{' '}
          (the “Site”) or its GitHub page equivalent at{' '}
					<a
						className="privacy__text-link"
						href="https://hliejun.github.io/ethereum-explorer/app/portfolio"
						rel="noopener noreferrer"
						target="_blank"
					>
            https://hliejun.github.io/ethereum-explorer
					</a>
          .
				</p>
				<p className="privacy__text">
          Tx Ethereum Block Explorer is built initially as a Free app by Huang
          Lie Jun. This SERVICE is provided by Huang Lie Jun at no cost and is
          intended for use as is, until it has been revised otherwise. Any
          monetisation, introduction of microtransactions or changes to its
          operation model will be announced on the site in a noticeable manner.
				</p>
				<p className="privacy__text">
          This page is used to inform visitors regarding policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use this Service.
				</p>
				<p className="privacy__text">
          If you choose to use this Service, then you agree to the collection
          and use of information in relation to this policy. The Personal
          Information that I collect is used for providing and improving the
          Service. I will not use or share your information with anyone except
          as described in this Privacy Policy.
				</p>
				<p className="privacy__text">
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at this site unless
          otherwise defined in this Privacy Policy.
				</p>
				<br />
				<span className="privacy__title">Personal Information We Collect</span>
				<p className="privacy__text">
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device.
				</p>
				<p className="privacy__text">
          Additionally, as you browse the Site, we collect information about the
          individual web pages or products that you view, what websites or
          search terms referred you to the Site, and information about how you
          interact with the Site. We refer to this automatically-collected
          information as “Device Information.”
				</p>
				<p className="privacy__text">
          We collect Device Information using the following technologies:
				</p>
				<ul className="privacy__list">
					<li className="privacy__list-item">
            “Cookies” are data files that are placed on your device or computer
            and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit{' '}
						<a
							className="privacy__text-link"
							href="http://www.allaboutcookies.org"
							rel="noopener noreferrer"
							target="_blank"
						>
              http://www.allaboutcookies.org
						</a>
            .
					</li>
					<li className="privacy__list-item">
            “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
					</li>
					<li className="privacy__list-item">
            “Web beacons,” “tags,” and “pixels” are electronic files used to
            record information about how you browse the Site.
					</li>
				</ul>
				<br />
				<span className="privacy__title">
          How We Use Your Personal Information
				</span>
				<p className="privacy__text">
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
				</p>
				<br />
				<span className="privacy__title">
          Sharing Your Personal Information
				</span>
				<p className="privacy__text">
          We share your Personal Information, particularly your anonymised
          Ethereum account address with API services such as Etherscan to browse
          and retrieve transaction data and history. To learn more about the
          Etherscan API service, please refer to{' '}
					<a
						className="privacy__text-link"
						href="https://etherscan.io/apis"
						rel="noopener noreferrer"
						target="_blank"
					>
            https://etherscan.io/apis
					</a>
          . To read about their Privacy Policy and find out how your Personal
          Information is used, please read{' '}
					<a
						className="privacy__text-link"
						href="https://etherscan.io/privacyPolicy"
						rel="noopener noreferrer"
						target="_blank"
					>
            https://etherscan.io/privacyPolicy
					</a>
          .
				</p>
				<p className="privacy__text">
          We also share your Personal Information with third parties to help us
          use your Personal Information, as described above. For example, we use
          Google Analytics to help us understand how our customers use the
          Site--you can read more about how Google uses your Personal
          Information at{' '}
					<a
						className="privacy__text-link"
						href="https://www.google.com/intl/en/policies/privacy"
						rel="noopener noreferrer"
						target="_blank"
					>
            https://www.google.com/intl/en/policies/privacy
					</a>
          . You can also opt-out of Google Analytics at{' '}
					<a
						className="privacy__text-link"
						href="https://tools.google.com/dlpage/gaoptout"
						rel="noopener noreferrer"
						target="_blank"
					>
            https://tools.google.com/dlpage/gaoptout
					</a>
          .
				</p>
				<p className="privacy__text">
          Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
				</p>
				<br />
				<span className="privacy__title">Do Not Track</span>
				<p className="privacy__text">
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
				</p>
				<br />
				<span className="privacy__title">Changes</span>
				<p className="privacy__text">
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
				</p>
				<br />
				<span className="privacy__title">Contact Us</span>
				<p className="privacy__text">
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at{' '}
					<a
						className="privacy__text-link"
						href="mailto:hliejun.dev@gmail.com"
						rel="noopener noreferrer"
					>
            hliejun.dev@gmail.com
					</a>
          .
				</p>
			</Construction>
		</div>
	);
};

export default Privacy;
