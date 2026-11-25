#include <bits/stdc++.h>
using namespace std;

long long loyalty_award(long long n, long long a, long long b) {
    std::vector<long long> dp(n + 1);
    dp[1] = a;
    if (n >= 2) dp[2] = b;
    for (long long i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

int main() {
    long long n, a, b;
    cin >> n >> a >> b;
    cout << loyalty_award(n, a, b) << "\n";
    return 0;
}
