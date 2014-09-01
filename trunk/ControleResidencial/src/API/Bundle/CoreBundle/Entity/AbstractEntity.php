elf::$returnArrayAsType;
	}	//	function getArrayReturnType()


	/**
	 * Is calculation caching enabled?
	 *
	 * @access	public
	 * @return boolean
	 */
	public function getCalculationCacheEnabled() {
		return $this->_calculationCacheEnabled;
	}	//	function getCalculationCacheEnabled()

	/**
	 * Enable/disable calculation cache
	 *
	 * @access	public
	 * @param boolean $pValue
	 */
	public function setCalculationCacheEnabled($pValue = TRUE) {
		$this->_calculationCacheEnabled = $pValue;
		$this->clearCalculationCache();
	}	//	function setCalculationCacheEnabled()


	/**
	 * Enable calculation cache
	 */
	public function enableCalculationCache() {
		$this->setCalculationCacheEnabl