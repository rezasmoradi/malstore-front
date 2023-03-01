import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

const Home = (props) => {

	const router = useRouter();

	return (
		<Layout title={'فروشگاه اینترنتی مال‌استور'}>
			<div className="w-full h-full dark:bg-slate-800">
				<div className='w-full h-full px-12'>
					<Header />
					<div className='w-full h-auto my-12'>
						{/* <div className='flex'>
							<div className='w-0 lg:w-1/12' />
							<div className='w-10/12 lg:w-9/12 h-auto lg:h-96 mx-4 rounded-md flex shadow lg:shadow-xl'>
								<div className='w-2/5 h-full -mr-1 relative border-r border-t border-b rounded-tr rounded-br border-primary bg-transparent'>
									<h2 className='text-base lg:text-xl font-medium p-4 lg:p-8 flex items-center'>
										<span className='inline-block relative dark:text-gray-300 px-4 before:content-[""] before:absolute before:-right-2 before:top-0 before:bottom-0 before:my-auto before:w-3 before:h-3 before:border-primary before:rounded-sm before:border-t-2 before:border-l-2 before:-rotate-45'>هواپزهای چند&zwnj;کاره</span>
									</h2>
									<ul className='px-8 lg:px-20'>
										<li className='my-4 flex items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-primary">
												<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
											</svg>
											<span className='text-sm lg:text-base dark:text-gray-300'>لمسی</span>
										</li>
										<li className='my-4 flex items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-primary">
												<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
											</svg>
											<span className='text-sm lg:text-base dark:text-gray-300'>کم&zwnj;صدا</span>
										</li>
										<li className='my-4 flex items-center'>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-primary">
												<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
											</svg>
											<span className='text-sm lg:text-base dark:text-gray-300'>پرقدرت</span>
										</li>
									</ul>
									<button className="flex justify-center mx-auto lg:ml-8 lg:mt-20 border border-primary text-sm lg:text-base dark:border-violet-300 font-medium py-1 px-2 rounded text-primary">
										بررسی و خرید
									</button>
								</div>
								<div className='w-3/5 h-full p-1'>
									<img src='./assets/images/best-pressure-cookers.png' />
								</div>
							</div>
							<div className='w-1/12' />
						</div> */}
						<div className='w-full h-auto mt-24 mb-4'>
							<div className='flex flex-col lg:flex-row justify-around items-center'>
								<div className='w-56 h-auto flex flex-col justify-between items-center'>
									<img src={`${router.basePath}/assets/images/cat-2.jpg`} className='w-52 h-52 border border-primary rounded-full shadow lg:shadow-lg' />
									<p className='mt-4 mb-8 dark:text-gray-300 font-medium'>لوازم خانه و آشپزخانه</p>
								</div>
								<div className='w-56 h-auto flex flex-col justify-between items-center'>
									<img src={`${router.basePath}/assets/images/cat-1.jpg`} className='w-52 h-52 border border-primary rounded-full shadow lg:shadow-lg' />
									<p className='mt-4 mb-8 dark:text-gray-300 font-medium'>کالای خواب</p>
								</div>
								<div className='w-56 h-auto flex flex-col justify-between items-center'>
									<img src={`${router.basePath}/assets/images/cat-3.jpg`} className='w-52 h-52 border border-primary rounded-full shadow lg:shadow-lg' />
									<p className='mt-4 mb-8 dark:text-gray-300 font-medium'>لوازم اصلاح و زیبایی</p>
								</div>
							</div>
						</div>
					</div>
					{/* <Footer /> */}
				</div>
			</div>
		</Layout>
	)
}

const mapStateToProps = (state) => ({
	data: state.counter
})

const mapDispatchToProps = (dispatch) => ({
	increment: (int) => dispatch(incrementCounter('INCREMENT', { count: int })),
	decrement: (int) => dispatch(decrementCounter('DECREMENT', { count: int }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
